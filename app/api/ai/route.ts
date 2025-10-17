import api from '@lib/ai/api';
import { SECURITY_POLICIES } from '@lib/security/config';
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = SECURITY_POLICIES.rateLimit.windowMs;
const RATE_LIMIT_MAX_REQUESTS = SECURITY_POLICIES.rateLimit.maxAIFeatureRequests;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const messages = await req.json();

    // Enhanced input validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    // Validate message structure
    for (const message of messages) {
      if (!message.role || !message.content) {
        return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
      }
      if (typeof message.content !== 'string' || message.content.length > 2000) {
        return NextResponse.json({ error: 'Content too long or invalid' }, { status: 400 });
      }
    }

    console.log('AI Request from IP:', ip, 'Messages count:', messages.length);

    // Call OpenAI API via Axios
    const response = await api.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 500,
        temperature: 0.7, // Add some randomness but keep it controlled
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 30000, // 30 second timeout
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
