import { AISuggestionConfig, FIELD_PROMPTS, FieldKey } from '@lib/ai/aiConfig';

export const buildAIMessages = (fieldKey: FieldKey, prompt: string, config: AISuggestionConfig) => {
  const sanitizedPrompt = prompt.replace(/<[^>]+>/g, '');
  const fieldLabel = FIELD_PROMPTS[fieldKey];

  return [
    {
      role: 'system',
      content: `You are an ${config.role}. Your task is to take a user's short input about a field and expand it into a full, well-written narrative **from the user's perspective, in first-person ("I")** that expresses their situation clearly and empathetically. 
      Do NOT give advice or instructions. Keep it under ${config.maxCharacters} characters. Tone: ${config.tone}. Content type: ${config.contentType}.
      Here are examples in first-person:
      Input: "I am unemployed"
      Output: "I am currently without a job and seeking new opportunities to support myself and my family."
      
      Input: "I have mounting debt"
      Output: "I am facing financial challenges due to growing debts, which makes it difficult to manage my monthly expenses."
      Always write from the user's perspective in first-person.`,
    },
    {
      role: 'user',
      content: `Rewrite the ${fieldLabel} of the user **in first-person narrative**, as if they are speaking about their situation. User input: ${sanitizedPrompt}`,
    },
  ];
};
