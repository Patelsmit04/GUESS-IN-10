import { NextRequest, NextResponse } from 'next/server';
import { RoomManager } from '@/lib/server/roomManager';
import { RoomAction } from '@/types/online';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.trim().toUpperCase();
    const { searchParams } = new URL(req.url);
    const participantId = searchParams.get('participantId');

    const room = RoomManager.getRoom(code);
    if (!room) {
      return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 });
    }

    const projected = RoomManager.projectForParticipant(room, participantId || '');
    return NextResponse.json({ success: true, room: projected });
  } catch (error: any) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.trim().toUpperCase();
    const body = await req.json();
    const action: RoomAction = body.action;

    if (!action || !action.type || !action.participantId) {
      return NextResponse.json({ success: false, error: 'Invalid room action payload' }, { status: 400 });
    }

    const result = RoomManager.handleAction(code, action);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Action failed' }, { status: 400 });
    }

    const updatedRoom = RoomManager.getRoom(code);
    if (!updatedRoom) {
      return NextResponse.json({ success: false, error: 'Room state missing' }, { status: 404 });
    }

    const projected = RoomManager.projectForParticipant(updatedRoom, action.participantId);
    return NextResponse.json({ success: true, room: projected });
  } catch (error: any) {
    console.error('Error dispatching room action:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
