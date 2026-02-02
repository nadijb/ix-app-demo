import { NextRequest, NextResponse } from 'next/server';
import { ChatRequest, ChatResponse } from '../../types/chat';

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.session_id || !body.message) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL not configured');
      return NextResponse.json(
        { status: 'error', message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`n8n webhook error: ${response.status}`);
      return NextResponse.json(
        { status: 'error', message: 'Backend service error' },
        { status: 502 }
      );
    }

    const data: ChatResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
