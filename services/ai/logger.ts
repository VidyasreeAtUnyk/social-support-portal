import { FIELD_PROMPTS } from '@lib/ai/aiConfig';
import api from '@lib/ai/api';

export const logAISuggestion = async (
  fieldKey: keyof typeof FIELD_PROMPTS,
  prompt: string,
  response: string,
) => {
  try {
    await api.post('/api/log', {
      fieldKey,
      prompt,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to log AI suggestion:', err);
  }
};

export const logAIError = async (
  fieldKey: keyof typeof FIELD_PROMPTS,
  prompt: string,
  errorMessage: string,
) => {
  try {
    await api.post('/api/log-error', {
      fieldKey,
      prompt,
      errorMessage,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to log AI error:', err);
  }
};
