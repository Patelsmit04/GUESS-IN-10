import { NextRequest, NextResponse } from 'next/server';
import { RoomManager } from '@/lib/server/roomManager';

export async function POST(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code.trim().toUpperCase();
    const body = await req.json();
    const { participantId } = body;

    if (!participantId) {
      return NextResponse.json({ success: false, error: 'Missing participantId' }, { status: 400 });
    }

    const ok = RoomManager.heartbeat(code, participantId);
    return NextResponse.json({ success: ok });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Heartbeat error' }, { status: 500 });
  }
}
