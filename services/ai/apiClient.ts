import api from '@lib/ai/api';
import { AISuggestionResponse, ChatMessage } from './types';

export const fetchAISuggestion = async (messages: ChatMessage[]): Promise<AISuggestionResponse> => {
  const { data } = await api.post<AISuggestionResponse>('/api/ai', messages, {
    timeout: 5000,
  });
  return data;
};
