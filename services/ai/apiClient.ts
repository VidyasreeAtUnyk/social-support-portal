import api from '@lib/api';
import { AISuggestionResponse } from './types';

export const fetchAISuggestion = async (messages: any): Promise<AISuggestionResponse> => {
  const { data } = await api.post<AISuggestionResponse>('/api/ai', messages, {
    timeout: 5000,
  });
  return data;
};
