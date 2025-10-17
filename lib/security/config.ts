/**
 * Security Configuration
 * 
 * Centralized configuration for security-related settings including
 * sensitive fields, encryption parameters, and security policies
 */

// Fields that contain personally identifiable information (PII) or sensitive data
// These fields will be encrypted before transmission
export const SENSITIVE_FIELDS = [
  // Personal Information
  'name',
  'nationalId', 
  'address',
  'phone',
  'email',
  
  // Financial Information
  'financialSituation',
  'monthlyIncome',
  
  // Employment Information
  'employmentCircumstances',
  'employmentStatus',
  
  // Application Details
  'reasonForApplying',
  
  // Additional sensitive fields can be added here
] as const;

export type SensitiveField = typeof SENSITIVE_FIELDS[number];

// Encryption configuration
export const ENCRYPTION_CONFIG = {
  // Algorithm and key length
  algorithm: 'AES-GCM',
  keyLength: 256,
  
  // IV (Initialization Vector) length in bytes
  ivLength: 12,
  
  // Maximum input length for encryption (prevent DoS)
  maxInputLength: 10000,
  
  // Maximum number of sensitive fields per form
  maxSensitiveFields: 20,
} as const;

// Security policies
export const SECURITY_POLICIES = {
  // Minimum password requirements (if implemented)
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  
  // Session security
  session: {
    timeoutMinutes: 30,
    maxConcurrentSessions: 3,
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    maxAIFeatureRequests: 5,
  },
  
  // Data retention
  dataRetention: {
    encryptedDataDays: 90,
    logsDays: 30,
    auditLogsDays: 365,
  },
} as const;
