'use client';

import { Button } from '@components/ui/button';
import { AI_CONFIG, FIELD_PROMPTS, FieldKey } from '@lib/ai/aiConfig';
import { AISuggestionResponse, getAISuggestion } from '@services/ai';

import { useState } from 'react';

interface AIHelperProps {
  fieldKey: FieldKey;
}

export default function AIHelper({ fieldKey }: AIHelperProps) {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHelpMeWrite = async (): Promise<void> => {
    setLoading(true);
    try {
      const data: AISuggestionResponse = await getAISuggestion({
        fieldKey,
        prompt,
        config: AI_CONFIG,
      });
      setSuggestion(data.choices[0].message.content);
    } catch (err: unknown) {
      const message = (err as Error)?.message || 'Unknown error';
      setSuggestion(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <textarea
        className="border rounded p-2 w-full"
        rows={3}
        placeholder={`Enter details for "${FIELD_PROMPTS[fieldKey]}"`}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button onClick={handleHelpMeWrite} disabled={loading}>
        {loading ? 'Generating...' : `Help me write "${FIELD_PROMPTS[fieldKey]}"`}
      </Button>

      {suggestion && (
        <div className="mt-2 p-4 bg-white border rounded shadow">
          <strong>AI Suggestion:</strong>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}
