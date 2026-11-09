import { CardRepository } from '../src/features/cards/repository/cardRepository';
import { CARDS_DATA } from '../src/features/cards/data/cards';
import { CATEGORIES } from '../src/features/cards/data/categories';
import { useGameStore } from '../src/features/game/state/gameStore';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

console.log('--- RUNNING GUESS 10 UNIT & INTEGRATION TESTS ---\n');

// 1. Test Card Repository & Content Verification
console.log('1. Testing Card Content & Repository:');
assert(CARDS_DATA.length >= 400, `Loaded ${CARDS_DATA.length} verified cards across 10 categories`);
assert(CATEGORIES.length === 10, `Configured exactly ${CATEGORIES.length} verified categories`);

// Verify every category has at least 40 cards
for (const cat of CATEGORIES) {
  const cardsInCat = CardRepository.getCardsByCategory(cat.id);
  assert(cardsInCat.length >= 40, `Category "${cat.name}" has ${cardsInCat.length} verified cards (target >= 40)`);
}

const panda = CardRepository.getCardById('anim_panda_005');
assert(!!panda, 'Found Giant Panda card');
assert(panda!.verificationStatus === 'verified', 'Panda verificationStatus is verified');
assert(panda!.primaryClues.length >= 2, 'Panda has at least 2 primary clues');
assert(panda!.secondaryClues.length >= 2, 'Panda has at least 2 secondary clues');
assert(panda!.aliases.length >= 2, 'Panda has answer aliases');

// 2. Test Alias Matching & Fuzzy Validation
console.log('\n2. Testing Alias Matching & Guess Validation:');
const guess1 = CardRepository.validateGuess('Giant Panda', panda!);
assert(guess1.isCorrect, 'Exact match "Giant Panda" is correct');

const guess2 = CardRepository.validateGuess('panda', panda!);
assert(guess2.isCorrect, 'Lowercase alias "panda" is correct');

const guess3 = CardRepository.validateGuess('The Panda Bear', panda!);
assert(guess3.isCorrect, 'Leading article "The Panda Bear" is correct');

const guess4 = CardRepository.validateGuess('  PANDA   ', panda!);
assert(guess4.isCorrect, 'Trimmed uppercase "  PANDA   " is correct');

const guess5 = CardRepository.validateGuess('Elephant', panda!);
assert(!guess5.isCorrect, 'Wrong guess "Elephant" is rejected');

// 3. Test Game Setup & State Machine
console.log('\n3. Testing Game Setup & Rule Engine:');
const store = useGameStore.getState();

store.configureGame(
  'one-on-one',
  [
    { name: 'Alice', avatar: '🦊', color: '#7357FF' },
    { name: 'Bob', avatar: '🦉', color: '#38BDF8' },
  ],
  3, // Target 3 cards for test
  'animals'
);

const stateAfterSetup = useGameStore.getState();
assert(stateAfterSetup.phase === 'privacy-transition', 'Phase transitioned directly to privacy-transition (random card drawn)');
assert(!!stateAfterSetup.secretCard, 'Secret card automatically drawn for Host');
assert(stateAfterSetup.players.length === 2, '2 players configured');
assert(stateAfterSetup.rules.targetCardsToWin === 3, 'Target cards configured to 3');
assert(stateAfterSetup.hostIndex === 0, 'Alice is Host in Round 1');
assert(stateAfterSetup.guesserIndex === 1, 'Bob is Guesser in Round 1');

// 4. Test Host Secret Card Confirmation & Privacy Transition
console.log('\n4. Testing Host Secret Card Confirmation & Handover:');
store.selectSecretCard(panda!);
const stateAfterSelect = useGameStore.getState();
assert(stateAfterSelect.phase === 'privacy-transition', 'Phase stays in privacy-transition');
assert(stateAfterSelect.secretCard?.id === panda!.id, 'Secret card stored safely in state');

store.confirmPrivacy();
const stateAfterConfirm = useGameStore.getState();
assert(stateAfterConfirm.phase === 'playing', 'Phase transitioned to playing');
assert(stateAfterConfirm.privacyConfirmed === true, 'Privacy confirmed');
assert(stateAfterConfirm.questionCount === 0, 'Question count starts at 0');

// 5. Test Question Tracking (Up to 10)
console.log('\n5. Testing Question Counter & Limits:');
store.answerQuestion('Is it a mammal?', 'yes');
assert(useGameStore.getState().questionCount === 1, 'Question count is now 1');
assert(useGameStore.getState().questionHistory.length === 1, 'History has 1 record');
assert(useGameStore.getState().questionHistory[0].response === 'yes', 'Recorded YES response');

store.answerQuestion('Can it fly?', 'no');
assert(useGameStore.getState().questionCount === 2, 'Question count is now 2');
assert(useGameStore.getState().questionHistory[1].response === 'no', 'Recorded NO response');

store.answerQuestion('Does it like classical music?', 'unknown');
assert(useGameStore.getState().questionCount === 3, 'Question count is now 3');
assert(useGameStore.getState().questionHistory[2].response === 'unknown', 'Recorded UNKNOWN response');

// 6. Test Clue Card Mechanics
console.log('\n6. Testing Clues System:');
const hintResult = store.useClue('hint');
assert(hintResult.success, 'Hint clue used successfully');
assert(useGameStore.getState().activeHints.length === 1, 'Active hints has 1 entry');
assert(useGameStore.getState().players[1].cluesRemaining.hint === 0, 'Guesser hint count decremented');

const elimResult = store.useClue('eliminate');
assert(elimResult.success, 'Eliminate clue used successfully');
assert(useGameStore.getState().activeEliminations.length === 1, 'Active elimination has 1 entry');

const bonusResult = store.useClue('bonus');
assert(bonusResult.success, 'Bonus question clue used successfully');
assert(useGameStore.getState().bonusQuestionsGranted === 1, 'Bonus question granted');
assert(useGameStore.getState().bonusClueUsedThisRound === true, 'Bonus clue marked used this round');

// Trying to use bonus again in same round should fail
const bonusDuplicate = store.useClue('bonus');
assert(!bonusDuplicate.success, 'Duplicate bonus in same round blocked');

// 7. Test Incorrect Guess Behavior
console.log('\n7. Testing Incorrect Guess Handling:');
const badGuessResult = store.submitGuess('Lion');
assert(!badGuessResult.isCorrect, 'Guess "Lion" evaluated as incorrect');
assert(useGameStore.getState().guessHistory.length === 1, 'Recorded 1 incorrect guess attempt');
assert(useGameStore.getState().questionCount === 3, 'Incorrect guess did NOT consume a question');

// 8. Test Correct Guess & Round Victory
console.log('\n8. Testing Correct Guess & Scoring:');
const goodGuessResult = store.submitGuess('Giant Panda');
assert(goodGuessResult.isCorrect, 'Guess "Giant Panda" evaluated as correct');
const stateAfterWin = useGameStore.getState();
assert(stateAfterWin.phase === 'round-result', 'Phase transitioned to round-result');
assert(stateAfterWin.players[1].score === 1, 'Guesser (Bob) score incremented to 1');
assert(stateAfterWin.players[1].collectedCardIds.includes(panda!.id), 'Panda added to collected card IDs');

// 9. Test Next Round & Role Alternation
console.log('\n9. Testing Role Alternation for Next Round:');
store.nextRound();
const stateRound2 = useGameStore.getState();
assert(stateRound2.currentRound === 2, 'Advanced to Round 2');
assert(stateRound2.hostIndex === 1, 'Host index alternated to Bob');
assert(stateRound2.guesserIndex === 0, 'Guesser index alternated to Alice');
assert(stateRound2.questionCount === 0, 'Question counter reset for new round');
assert(!!stateRound2.secretCard, 'Secret card automatically drawn for new round');
assert(stateRound2.phase === 'privacy-transition', 'Ready for new secret card review in privacy-transition');

console.log('\n✅ ALL GUESS 10 SPECIFICATION & ENGINE TESTS PASSED!\n');

