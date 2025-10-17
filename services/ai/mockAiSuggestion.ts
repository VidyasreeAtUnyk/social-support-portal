// services/ai/mockAISuggestion.ts
export const mockAISuggestion = async (fieldKey: string, prompt: string, language: string = 'en') => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  // Return a dummy suggestion based on the field and language
  const suggestions: Record<string, Record<string, string>> = {
    financialSituation: {
      en: `Based on your input, your financial situation is challenging due to unexpected expenses and low income.`,
      ar: `بناءً على مدخلاتك، وضعك المالي صعب بسبب النفقات غير المتوقعة والدخل المنخفض.`
    },
    employmentCircumstances: {
      en: `Currently, you are seeking employment opportunities while managing prior work commitments and upskilling.`,
      ar: `حالياً، أنت تبحث عن فرص عمل بينما تدير التزامات العمل السابقة وتطوير المهارات.`
    },
    reasonForApplying: {
      en: `You are applying because you need financial support to stabilize your living situation and achieve personal growth.`,
      ar: `أنت تتقدم بطلب لأنك تحتاج إلى دعم مالي لاستقرار وضعك المعيشي وتحقيق النمو الشخصي.`
    },
  };

  const fieldSuggestions = suggestions[fieldKey] || { 
    en: 'Here is a helpful suggestion!',
    ar: 'إليك اقتراح مفيد!'
  };

  return fieldSuggestions[language] || fieldSuggestions.en;
};
