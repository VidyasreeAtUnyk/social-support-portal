import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fieldKey, prompt, response, timestamp } = await req.json();
    console.log(
      `[AI OUT] [${timestamp}] Field: ${fieldKey}, Prompt: ${prompt}, Response: ${response}`,
    );

    // Optionally: save to database instead of console
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    console.error('Failed to handle AI error log:', err);
    return NextResponse.json({ status: 'failed', error: err }, { status: 500 });
  }
}
