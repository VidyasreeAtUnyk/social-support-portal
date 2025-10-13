import { AI_CONFIG } from '@lib/ai/aiConfig';
import { getAISuggestion } from '@services/ai';
import { AISuggestionResponse } from '@services/ai/types';

// Mock dependencies
jest.mock('@services/ai/apiClient', () => ({
  fetchAISuggestion: jest.fn(),
}));
jest.mock('@services/ai/promptBuilder', () => ({
  buildAIMessages: jest.fn(),
}));
jest.mock('@services/ai/logger', () => ({
  logAISuggestion: jest.fn(),
  logAIError: jest.fn(),
}));

import { fetchAISuggestion } from '@services/ai/apiClient';
import { logAIError, logAISuggestion } from '@services/ai/logger';
import { buildAIMessages } from '@services/ai/promptBuilder';

describe('getAISuggestion (modularized)', () => {
  const fieldKey = 'financialSituation' as const;
  const prompt = 'I am unemployed';
  const mockMessages = [{ role: 'user', content: 'test message' }];
  const mockResponse: AISuggestionResponse = {
    choices: [{ message: { content: 'AI narrative about unemployment' } }],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (buildAIMessages as jest.Mock).mockReturnValue(mockMessages);
  });

  // 1. Input validation
  it('throws error for empty prompt', async () => {
    await expect(getAISuggestion({ fieldKey, prompt: '' })).rejects.toThrow(
      'Prompt cannot be empty',
    );
  });

  // 2. Success path
  it('calls buildAIMessages, fetchAISuggestion, and logs suggestion', async () => {
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getAISuggestion({ fieldKey, prompt, config: AI_CONFIG });

    expect(buildAIMessages).toHaveBeenCalledWith(fieldKey, prompt, AI_CONFIG);
    expect(fetchAISuggestion).toHaveBeenCalledWith(mockMessages);
    expect(logAISuggestion).toHaveBeenCalledWith(
      fieldKey,
      prompt,
      'AI narrative about unemployment',
    );
    expect(result).toEqual(mockResponse);
  });

  // 3. Truncation logic
  it('truncates response if longer than maxCharacters', async () => {
    const longText = 'x'.repeat(AI_CONFIG.maxCharacters + 50);
    const response = { choices: [{ message: { content: longText } }] };
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce(response);

    const result = await getAISuggestion({ fieldKey, prompt, config: AI_CONFIG });

    expect(result.choices[0].message.content.length).toBe(AI_CONFIG.maxCharacters);
  });

  // 4. Error handling with message
  it('logs and rethrows error on API failure', async () => {
    (fetchAISuggestion as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await expect(getAISuggestion({ fieldKey, prompt, config: AI_CONFIG })).rejects.toThrow(
      'Network Error',
    );

    expect(logAIError).toHaveBeenCalledWith(fieldKey, prompt, 'Network Error');
  });

  // 5. Error handling fallback (no message)
  it('falls back to default error message if error.message is missing', async () => {
    (fetchAISuggestion as jest.Mock).mockRejectedValueOnce({});

    await expect(getAISuggestion({ fieldKey, prompt, config: AI_CONFIG })).rejects.toThrow(
      'AI request failed',
    );

    expect(logAIError).toHaveBeenCalledWith(fieldKey, prompt, 'AI request failed');
  });

  // 6. Custom config override
  it('respects custom config overrides for maxCharacters', async () => {
    const customConfig = { ...AI_CONFIG, maxCharacters: 50 };
    const longResponse = { choices: [{ message: { content: 'a'.repeat(200) } }] };
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce(longResponse);

    const result = await getAISuggestion({ fieldKey, prompt, config: customConfig });
    expect(result.choices[0].message.content.length).toBe(50);
  });

  // 7. Logger resilience
  it('continues execution even if logging suggestion fails', async () => {
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce(mockResponse);
    (logAISuggestion as jest.Mock).mockRejectedValueOnce(new Error('Logging failed'));

    await expect(getAISuggestion({ fieldKey, prompt, config: AI_CONFIG })).resolves.toBeDefined();
  });

  it('handles empty AI response gracefully', async () => {
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce({});
    await expect(getAISuggestion({ fieldKey, prompt })).resolves.toBeDefined();
  });

  it('works even when config is undefined', async () => {
    (fetchAISuggestion as jest.Mock).mockResolvedValueOnce(mockResponse);
    await expect(getAISuggestion({ fieldKey, prompt, config: undefined })).resolves.toEqual(
      mockResponse,
    );
  });

  it('still throws AI error even if logAIError fails', async () => {
    (fetchAISuggestion as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));
    (logAIError as jest.Mock).mockRejectedValueOnce(new Error('Logging failed'));

    await expect(getAISuggestion({ fieldKey, prompt })).rejects.toThrow('Network Error');
  });

  it('waits for fetchAISuggestion before returning', async () => {
    const spy = jest.fn();
    (fetchAISuggestion as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            spy();
            resolve(mockResponse);
          }, 100),
        ),
    );

    await getAISuggestion({ fieldKey, prompt });
    expect(spy).toHaveBeenCalled();
  });
});
