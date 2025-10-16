import api from '@lib/ai/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const messages = await req.json();
    console.log(messages);

    if (!messages) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Call OpenAI API via Axios
    const response = await api.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const message =
      (error as { response?: { data?: unknown } }).response?.data || 'Something went wrong';
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
