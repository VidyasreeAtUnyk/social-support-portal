export interface AISuggestionResponse {
  choices: { message: { content: string } }[];
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
