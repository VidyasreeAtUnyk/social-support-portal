import { AI_CONFIG, AISuggestionConfig, FieldKey } from '@lib/ai/aiConfig';
import { fetchAISuggestion } from './apiClient';
import { logAIError, logAISuggestion } from './logger';
import { buildAIMessages } from './promptBuilder';
import { AISuggestionResponse } from './types';

interface AIRequestOptions {
  fieldKey: FieldKey;
  prompt: string;
  config?: AISuggestionConfig;
}

export const getAISuggestion = async ({
  fieldKey,
  prompt,
  config = AI_CONFIG,
}: AIRequestOptions): Promise<AISuggestionResponse> => {
  if (!prompt?.trim()) throw new Error('Prompt cannot be empty');

  const messages = buildAIMessages(fieldKey, prompt, config);

  try {
    const data = await fetchAISuggestion(messages);

    const suggestion = data?.choices?.[0]?.message?.content || '';

    if (config.maxCharacters && suggestion.length > config.maxCharacters) {
      data.choices[0].message.content = suggestion.slice(0, config.maxCharacters);
    }

    // Safely log suggestion — don't break the flow if logging fails
    try {
      await logAISuggestion(fieldKey, prompt, suggestion);
    } catch (logError: unknown) {
      const msg = (logError as Error)?.message || 'Unknown logging error';
      console.warn('⚠️ AI suggestion logging failed but continuing:', msg);
    }

    return data;
  } catch (error: unknown) {
    try {
      const message = (error as Error)?.message || 'AI request failed';
      await logAIError(fieldKey, prompt, message);
    } catch (logError) {
      console.warn('AI Error logging failed:', (logError as Error).message);
    }

    throw new Error((error as Error)?.message || 'AI request failed');
  }
};

export * from './types';
