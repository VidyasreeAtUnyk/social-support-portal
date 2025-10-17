/**
 * Language Configuration for AI Prompts
 * 
 * Centralized configuration for language-specific AI instructions
 * Makes it easy to add new languages without code changes
 */

export interface LanguageConfig {
  instruction: string;
  grammar?: string;
  direction?: 'ltr' | 'rtl';
  script?: string; // Native script example
}

export const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
  'en': {
    instruction: 'Respond in English with proper grammar.',
    grammar: 'English',
    direction: 'ltr',
    script: 'English'
  },
  'ar': {
    instruction: 'Respond in Arabic (العربية) with proper Arabic grammar and RTL text direction.',
    grammar: 'Arabic',
    direction: 'rtl',
    script: 'العربية'
  },
  'fr': {
    instruction: 'Respond in French (Français) with proper French grammar.',
    grammar: 'French',
    direction: 'ltr',
    script: 'Français'
  },
  'es': {
    instruction: 'Respond in Spanish (Español) with proper Spanish grammar.',
    grammar: 'Spanish',
    direction: 'ltr',
    script: 'Español'
  },
  'de': {
    instruction: 'Respond in German (Deutsch) with proper German grammar.',
    grammar: 'German',
    direction: 'ltr',
    script: 'Deutsch'
  },
  'zh': {
    instruction: 'Respond in Chinese (中文) with proper Chinese grammar.',
    grammar: 'Chinese',
    direction: 'ltr',
    script: '中文'
  },
  'ja': {
    instruction: 'Respond in Japanese (日本語) with proper Japanese grammar.',
    grammar: 'Japanese',
    direction: 'ltr',
    script: '日本語'
  },
  'ko': {
    instruction: 'Respond in Korean (한국어) with proper Korean grammar.',
    grammar: 'Korean',
    direction: 'ltr',
    script: '한국어'
  },
  'hi': {
    instruction: 'Respond in Hindi (हिन्दी) with proper Hindi grammar.',
    grammar: 'Hindi',
    direction: 'ltr',
    script: 'हिन्दी'
  },
  'ur': {
    instruction: 'Respond in Urdu (اردو) with proper Urdu grammar and RTL text direction.',
    grammar: 'Urdu',
    direction: 'rtl',
    script: 'اردو'
  },
};

/**
 * Get language instruction for AI prompts
 * @param languageCode - Language code (e.g., 'en', 'ar')
 * @returns Language-specific instruction string
 */
export const getLanguageInstruction = (languageCode: string): string => {
  const config = LANGUAGE_CONFIG[languageCode];
  
  if (config) {
    return config.instruction;
  }
  
  // Fallback for unknown languages
  return `Respond in ${languageCode} with proper grammar.`;
};

/**
 * Get language configuration
 * @param languageCode - Language code (e.g., 'en', 'ar')
 * @returns Language configuration object
 */
export const getLanguageConfig = (languageCode: string): LanguageConfig => {
  return LANGUAGE_CONFIG[languageCode] || {
    instruction: `Respond in ${languageCode} with proper grammar.`,
    grammar: languageCode,
    direction: 'ltr',
    script: languageCode
  };
};
