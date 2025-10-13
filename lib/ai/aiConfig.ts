export interface AISuggestionConfig {
  maxCharacters: number;
  contentType: 'informative' | 'persuasive' | 'concise' | 'polished narrative';
  tone: 'empathetic' | 'formal' | 'friendly';
  role: string;
}

export const AI_CONFIG: AISuggestionConfig = {
  maxCharacters: 250,
  contentType: 'polished narrative',
  tone: 'empathetic',
  role: 'expert copywriter',
};

// Field-specific labels/prompts
export const FIELD_PROMPTS = {
  financialSituation: 'Current Financial Situation',
  employmentCircumstances: 'Employment Circumstances',
  reasonForApplying: 'Reason for Applying',
} as const;

export type FieldKey = keyof typeof FIELD_PROMPTS;
