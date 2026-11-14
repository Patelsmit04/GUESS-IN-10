import { NextRequest, NextResponse } from 'next/server';
import { RoomManager } from '@/lib/server/roomManager';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hostId, hostName, hostAvatar, mode, category, targetCards, teamNameA, teamNameB } = body;

    if (!hostId || !category) {
      return NextResponse.json({ success: false, error: 'Missing required room parameters' }, { status: 400 });
    }

    const room = RoomManager.createRoom({
      hostId,
      hostName: hostName || 'Player 1',
      hostAvatar: hostAvatar || '🦊',
      mode: mode || 'one-on-one',
      category,
      targetCards: targetCards || 7,
      teamNameA,
      teamNameB,
    });

    const projected = RoomManager.projectForParticipant(room, hostId);
    return NextResponse.json({ success: true, room: projected, code: room.code });
  } catch (error: any) {
    console.error('Error creating room:', error);
    return NextResponse.json({ success: false, error: 'Failed to create room' }, { status: 500 });
  }
}
