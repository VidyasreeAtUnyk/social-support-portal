/**
 * Application Constants
 * 
 * This file contains all hardcoded values used throughout the application.
 * Centralizing these constants makes the application more maintainable and
 * easier to configure.
 */

// ============================================================================
// LANGUAGE & INTERNATIONALIZATION CONSTANTS
// ============================================================================

export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar',
} as const;

export const LANGUAGE_NAMES = {
  [LANGUAGES.ENGLISH]: 'English',
  [LANGUAGES.ARABIC]: 'Arabic',
} as const;

export const LANGUAGE_DISPLAY_NAMES = {
  [LANGUAGES.ENGLISH]: 'English',
  [LANGUAGES.ARABIC]: 'العربية',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.ENGLISH;
export const FALLBACK_LANGUAGE = LANGUAGES.ENGLISH;

// ============================================================================
// TRANSLATION NAMESPACES
// ============================================================================

export const TRANSLATION_NAMESPACES = {
  COMMON: 'common',
  COUNTRIES: 'countries',
  STATES: 'states',
  STEP1: 'step1',
  STEP2: 'step2',
  STEP3: 'step3',
} as const;

export const DEFAULT_NAMESPACE = TRANSLATION_NAMESPACES.COMMON;

// ============================================================================
// FORM CONSTANTS
// ============================================================================

export const FORM_STEPS = {
  PERSONAL_INFO: 1,
  FAMILY_INFO: 2,
  SITUATION_DESCRIPTION: 3,
} as const;

export const TOTAL_FORM_STEPS = 3;

export const STEP_NAMES = {
  [FORM_STEPS.PERSONAL_INFO]: 'personalInfo',
  [FORM_STEPS.FAMILY_INFO]: 'familyInfo',
  [FORM_STEPS.SITUATION_DESCRIPTION]: 'situationDescription',
} as const;

// ============================================================================
// FIELD CONSTANTS
// ============================================================================

export const FIELD_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  DATE: 'date',
  EMAIL: 'email',
  TEL: 'tel',
} as const;

export const DYNAMIC_OPTIONS = {
  COUNTRIES: 'countries',
  STATES: 'states',
} as const;

// ============================================================================
// STEP3 FORM FIELD NAMES
// ============================================================================

export const STEP3_FIELDS = {
  FINANCIAL_SITUATION: 'financialSituation',
  EMPLOYMENT_CIRCUMSTANCES: 'employmentCircumstances',
  REASON_FOR_APPLYING: 'reasonForApplying',
} as const;

// ============================================================================
// TOAST CONSTANTS
// ============================================================================

export const TOAST_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const TOAST_NAMESPACE = TRANSLATION_NAMESPACES.COMMON;

// ============================================================================
// AI CONSTANTS
// ============================================================================

export const AI_FIELD_KEYS = {
  FINANCIAL_SITUATION: 'financialSituation',
  EMPLOYMENT_CIRCUMSTANCES: 'employmentCircumstances',
  REASON_FOR_APPLYING: 'reasonForApplying',
} as const;

// ============================================================================
// PHONE VALIDATION CONSTANTS
// ============================================================================

export const PHONE_VALIDATION = {
  DEFAULT_COUNTRY: 'AE',
  ALLOWED_COUNTRIES: ['AE', 'IN', 'US', 'GB', 'SA', 'KW', 'QA', 'BH', 'OM'],
} as const;

// ============================================================================
// SECURITY CONSTANTS
// ============================================================================

export const SECURITY = {
  ENCRYPTION_ALGORITHM: 'AES-GCM',
  KEY_LENGTH: 256,
  IV_LENGTH: 12,
  TAG_LENGTH: 16,
} as const;

// ============================================================================
// UI CONSTANTS
// ============================================================================

export const UI = {
  BREAKPOINTS: {
    MOBILE: 600,
    TABLET: 960,
    DESKTOP: 1280,
  },
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  Z_INDEX: {
    TOOLTIP: 1500,
    MODAL: 1300,
    SNACKBAR: 1400,
  },
} as const;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION = {
  MAX_LENGTH: {
    TEXT_AREA: 1000,
    TEXT_INPUT: 255,
    PHONE: 20,
  },
  MIN_LENGTH: {
    PASSWORD: 8,
    NAME: 2,
  },
} as const;

// ============================================================================
// API CONSTANTS
// ============================================================================

export const API = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// ============================================================================
// STORAGE CONSTANTS
// ============================================================================

export const STORAGE_KEYS = {
  LANGUAGE: 'i18nextLng',
  FORM_DATA: 'formData',
  ENCRYPTION_KEY: 'encryptionKey',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a language is RTL
 */
export const isRTLLanguage = (language: string): boolean => {
  return language === LANGUAGES.ARABIC;
};

/**
 * Get effective language code (handles language variants like 'en-US' -> 'en')
 */
export const getEffectiveLanguage = (language: string): string => {
  return language.includes(LANGUAGES.ENGLISH) ? LANGUAGES.ENGLISH : language;
};

/**
 * Get step title translation key
 */
export const getStepTitleKey = (step: number): string => {
  const stepMap = {
    [FORM_STEPS.PERSONAL_INFO]: `${TRANSLATION_NAMESPACES.STEP1}:title`,
    [FORM_STEPS.FAMILY_INFO]: `${TRANSLATION_NAMESPACES.STEP2}:title`,
    [FORM_STEPS.SITUATION_DESCRIPTION]: `${TRANSLATION_NAMESPACES.STEP3}:title`,
  };
  return stepMap[step as keyof typeof stepMap] || `${TRANSLATION_NAMESPACES.STEP1}:title`;
};

/**
 * Get step namespace for translation
 */
export const getStepNamespace = (step: number): string => {
  const namespaceMap = {
    [FORM_STEPS.PERSONAL_INFO]: TRANSLATION_NAMESPACES.STEP1,
    [FORM_STEPS.FAMILY_INFO]: TRANSLATION_NAMESPACES.STEP2,
    [FORM_STEPS.SITUATION_DESCRIPTION]: TRANSLATION_NAMESPACES.STEP3,
  };
  return namespaceMap[step as keyof typeof namespaceMap] || TRANSLATION_NAMESPACES.STEP1;
};
