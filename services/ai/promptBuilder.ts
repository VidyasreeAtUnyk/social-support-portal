import { AISuggestionConfig, FIELD_PROMPTS, FieldKey } from '@lib/ai/aiConfig';
import { getLanguageInstruction } from '@lib/ai/languageConfig';
import { ChatMessage } from './types';

// Enhanced input sanitization
const sanitizeInput = (input: string): string => {
  return input
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove potential script injections
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove potential SQL injection patterns (simplified)
    .replace(/[';-]/g, '')
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Trim and limit length
    .trim()
    .substring(0, 1000); // Limit to 1000 characters
};

export const buildAIMessages = (
  fieldKey: FieldKey,
  prompt: string,
  language: string = 'en',
  config: AISuggestionConfig,
): ChatMessage[] => {
  const sanitizedPrompt = sanitizeInput(prompt);
  const fieldLabel = FIELD_PROMPTS[fieldKey];
  
  // Language instruction from configuration
  const languageCode = Array.isArray(language) ? language[2] : language;
  const languageInstruction = getLanguageInstruction(languageCode);

  // Enhanced security instructions
  const securityInstructions = `
IMPORTANT SECURITY GUIDELINES:
- Do not request, store, or process any personally identifiable information (PII)
- Do not ask for names, addresses, phone numbers, ID numbers, or other sensitive data
- Focus only on general situational descriptions without specific personal details
- If user provides PII, do not include it in your response
- Maintain user privacy and data protection standards`;

  return [
    {
      role: 'system',
      content: `You are an ${config.role}. Your task is to take a user's short input about a field and expand it into a full, well-written narrative **from the user's perspective, in first-person ("I")** that expresses their situation clearly and empathetically. 
      Do NOT give advice or instructions. Keep it under ${config.maxCharacters} characters. Tone: ${config.tone}. Content type: ${config.contentType}.
      ${languageInstruction}
      
      ${securityInstructions}
      
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
