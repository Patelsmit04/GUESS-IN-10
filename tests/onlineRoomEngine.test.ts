import { RoomManager } from '../src/lib/server/roomManager';
import { CardRepository } from '../src/features/cards/repository/cardRepository';
import { RoomAction } from '../src/types/online';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  } else {
    console.log(`  ✓ ${msg}`);
  }
}

console.log('--- RUNNING GUESS 10 REMOTE MULTIPLAYER ENGINE TESTS ---');

// 1. Create Room
console.log('\n1. Testing Room Creation & Code Generation:');
const hostId = 'user_host_101';
const room = RoomManager.createRoom({
  hostId,
  hostName: 'Alice',
  hostAvatar: '🦊',
  mode: 'one-on-one',
  category: 'animals',
  targetCards: 3,
});

assert(!!room.code, `Room created with code: ${room.code}`);
assert(room.status === 'waiting', 'Room status starts in "waiting"');
assert(room.participants[hostId].isHost === true, 'Alice is marked as host');
assert(room.participants[hostId].team === 'A', 'Host assigned to Team A');

// 2. Join Room
console.log('\n2. Testing Guest Joining & Team Assignment:');
const guestId = 'user_guest_202';
const joinRes = RoomManager.joinRoom({
  code: room.code,
  participantId: guestId,
  name: 'Bob',
  avatar: '🦉',
  preferredTeam: 'B',
});

assert(joinRes.success === true, 'Bob joined room successfully');
assert(room.participants[guestId].team === 'B', 'Bob assigned to Team B');
assert(Object.keys(room.participants).length === 2, 'Room now has 2 participants');

// 3. Ready States & Match Start Gating
console.log('\n3. Testing Ready States & Start Gate:');
const startFail = RoomManager.startMatch(room.code, hostId);
assert(startFail.success === false, 'Cannot start match when guest is not ready');

RoomManager.setReady(room.code, guestId, true);
assert(room.participants[guestId].isReady === true, 'Bob is marked ready');

const startSuccess = RoomManager.startMatch(room.code, hostId);
assert(startSuccess.success === true, 'Host successfully started the match');
assert(room.status === 'in_progress', 'Room status is now "in_progress"');
assert(room.hostParticipantId === hostId, 'Alice is Host (card holder)');
assert(room.guesserParticipantId === guestId, 'Bob is Guesser');

// 4. CRITICAL PRIVACY & ROLE-BASED PROJECTION TEST
console.log('\n4. Testing Role-Based Secrecy (Guesser MUST NOT see secret card):');
const hostProjection = RoomManager.projectForParticipant(room, hostId);
const guesserProjection = RoomManager.projectForParticipant(room, guestId);

assert(hostProjection.secretCard !== null, 'Host projection CAN see the secret card');
assert(guesserProjection.secretCard === null, 'Guesser projection CANNOT see secret card (strictly null)');
assert(guesserProjection.publicBuzzWords.length === 3, 'Guesser CAN see 3 public buzzwords as thematic anchors');
assert(guesserProjection.isMyTurnToAsk === true, 'Guesser has turn to ask');
assert(hostProjection.isMyTurnToAnswer === true, 'Host has turn to answer');

// 5. Question Asking & Answering
console.log('\n5. Testing Question Submission & Host Answering:');
const qAction: RoomAction = {
  actionId: 'act_q1',
  type: 'ASK_QUESTION',
  participantId: guestId,
  payload: { text: 'Can it fly?' },
};
const askRes = RoomManager.handleAction(room.code, qAction);
assert(askRes.success === true, 'Guesser asked "Can it fly?"');
assert(room.questionHistory.length === 1, 'Question recorded in history');

// Answer question
const aAction: RoomAction = {
  actionId: 'act_a1',
  type: 'ANSWER_QUESTION',
  participantId: hostId,
  payload: { text: 'Can it fly?', response: 'no' },
};
const ansRes = RoomManager.handleAction(room.code, aAction);
assert(ansRes.success === true, 'Host answered NO');
assert(room.questionCount === 1, 'Question count is now 1');
assert(room.questionHistory[0].response === 'no', 'Question response recorded as NO');

// 6. Action Idempotency / Duplicate Prevention
console.log('\n6. Testing Action Deduplication:');
const dupAnsRes = RoomManager.handleAction(room.code, aAction);
assert(dupAnsRes.success === true, 'Duplicate action safely accepted as idempotent');
assert(room.questionCount === 1, 'Duplicate action did NOT increment question count');

// 7. Clue Usage
console.log('\n7. Testing Clue Activation:');
const clueAction: RoomAction = {
  actionId: 'act_clue1',
  type: 'USE_CLUE',
  participantId: guestId,
  payload: { type: 'hint' },
};
const clueRes = RoomManager.handleAction(room.code, clueAction);
assert(clueRes.success === true, 'Guesser activated hint clue');
assert(room.cluesRemaining.B.hint === 0, 'Team B hints decremented');
assert(room.activeHints.length === 1, 'Active hint revealed');

// 8. Guess Submission & Scoring
console.log('\n8. Testing Server-Authoritative Guess Evaluation:');
// 8a. Wrong guess
const wrongGuessAction: RoomAction = {
  actionId: 'act_g_wrong',
  type: 'SUBMIT_GUESS',
  participantId: guestId,
  payload: { guessText: 'Completely Wrong Guess XYZ' },
};
const wrongRes = RoomManager.handleAction(room.code, wrongGuessAction);
assert(wrongRes.success === true, 'Wrong guess processed');
assert(room.guessHistory.length === 1, '1 guess recorded');
assert(room.guessHistory[0].isCorrect === false, 'Guess evaluated as false');
assert(room.teamB.score === 0, 'Team B score remains 0');

// 8b. Correct guess
const secretName = room.secretCard.name;
const correctGuessAction: RoomAction = {
  actionId: 'act_g_correct',
  type: 'SUBMIT_GUESS',
  participantId: guestId,
  payload: { guessText: secretName },
};
const correctRes = RoomManager.handleAction(room.code, correctGuessAction);
assert(correctRes.success === true, 'Correct guess processed');
assert(room.status === 'round_complete', 'Round status is "round_complete"');
assert(room.teamB.score === 1, 'Team B score incremented to 1');
assert(room.roundResult?.outcome === 'correct_guess', 'Round outcome is "correct_guess"');

// 9. Post-Round Revelation
console.log('\n9. Testing Post-Round Reveal (Both players can now view card):');
const postRoundGuesserProj = RoomManager.projectForParticipant(room, guestId);
assert(postRoundGuesserProj.secretCard !== null, 'Guesser CAN view revealed card now that round is complete');

// 10. Next Round & Role Alternation
console.log('\n10. Testing Role Alternation in Next Round:');
const nextRoundAction: RoomAction = {
  actionId: 'act_next_rnd',
  type: 'NEXT_ROUND',
  participantId: hostId,
};
const nextRes = RoomManager.handleAction(room.code, nextRoundAction);
assert(nextRes.success === true, 'Next round started');
assert(room.currentRound === 2, 'Current round is now 2');
assert(room.hostTeam === 'B', 'Team B is now Host team');
assert(room.guesserTeam === 'A', 'Team A is now Guesser team');
assert(room.questionCount === 0, 'Question count reset to 0');
assert(room.status === 'in_progress', 'Match resumed in active play');

console.log('\n✅ ALL GUESS 10 REMOTE MULTIPLAYER ENGINE TESTS PASSED!');
