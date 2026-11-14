import { NextRequest } from 'next/server';
import { RoomManager } from '@/lib/server/roomManager';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code.trim().toUpperCase();
  const { searchParams } = new URL(req.url);
  const participantId = searchParams.get('participantId') || '';

  const room = RoomManager.getRoom(code);
  if (!room) {
    return new Response(JSON.stringify({ error: 'Room not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // 1. Send initial state immediately
      const initialProjected = RoomManager.projectForParticipant(room, participantId);
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(initialProjected)}\n\n`)
      );

      // 2. Subscribe to authoritative state changes
      const unsubscribe = RoomManager.subscribe(code, (updatedRoom) => {
        try {
          const projected = RoomManager.projectForParticipant(updatedRoom, participantId);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(projected)}\n\n`));
        } catch (err) {
          console.error('SSE send error:', err);
        }
      });

      // 3. Heartbeat keepalive every 15 seconds
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keepalive\n\n'));
        } catch {
          clearInterval(heartbeatInterval);
        }
      }, 15000);

      req.signal.addEventListener('abort', () => {
        clearInterval(heartbeatInterval);
        unsubscribe();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
