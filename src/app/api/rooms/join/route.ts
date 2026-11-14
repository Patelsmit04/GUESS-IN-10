import { NextRequest, NextResponse } from 'next/server';
import { RoomManager } from '@/lib/server/roomManager';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code, participantId, name, avatar, preferredTeam } = body;

    if (!code || !participantId) {
      return NextResponse.json({ success: false, error: 'Missing code or participant ID' }, { status: 400 });
    }

    const result = RoomManager.joinRoom({
      code: code.trim().toUpperCase(),
      participantId,
      name: name || 'Guest Player',
      avatar: avatar || '⭐',
      preferredTeam,
    });

    if (!result.success || !result.room) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to join room' }, { status: 400 });
    }

    const projected = RoomManager.projectForParticipant(result.room, participantId);
    return NextResponse.json({ success: true, room: projected, code: result.room.code });
  } catch (error: any) {
    console.error('Error joining room:', error);
    return NextResponse.json({ success: false, error: 'Internal server error while joining room' }, { status: 500 });
  }
}
