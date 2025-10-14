// services/ai/mockAISuggestion.ts
export const mockAISuggestion = async (fieldKey: string, prompt: string) => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  // Return a dummy suggestion based on the field
  const suggestions: Record<string, string> = {
    financialSituation: `Based on your input, your financial situation is challenging due to unexpected expenses and low income.`,
    employmentCircumstances: `Currently, you are seeking employment opportunities while managing prior work commitments and upskilling.`,
    reasonForApplying: `You are applying because you need financial support to stabilize your living situation and achieve personal growth.`,
  };

  return suggestions[fieldKey] || 'Here is a helpful suggestion!';
};
