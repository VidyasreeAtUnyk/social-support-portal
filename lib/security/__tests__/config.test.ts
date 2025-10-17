import { ENCRYPTION_CONFIG, SECURITY_POLICIES, SENSITIVE_FIELDS } from '../config';

describe('Security Configuration', () => {
  describe('SENSITIVE_FIELDS', () => {
    it('should contain expected sensitive fields', () => {
      expect(SENSITIVE_FIELDS).toContain('name');
      expect(SENSITIVE_FIELDS).toContain('nationalId');
      expect(SENSITIVE_FIELDS).toContain('address');
      expect(SENSITIVE_FIELDS).toContain('phone');
      expect(SENSITIVE_FIELDS).toContain('email');
      expect(SENSITIVE_FIELDS).toContain('financialSituation');
      expect(SENSITIVE_FIELDS).toContain('monthlyIncome');
      expect(SENSITIVE_FIELDS).toContain('employmentCircumstances');
      expect(SENSITIVE_FIELDS).toContain('employmentStatus');
      expect(SENSITIVE_FIELDS).toContain('reasonForApplying');
    });

    it('should be an array', () => {
      expect(SENSITIVE_FIELDS).toBeInstanceOf(Array);
      expect(SENSITIVE_FIELDS.length).toBeGreaterThan(0);
    });

    it('should not contain non-sensitive fields', () => {
      expect(SENSITIVE_FIELDS).not.toContain('dob');
      expect(SENSITIVE_FIELDS).not.toContain('gender');
      expect(SENSITIVE_FIELDS).not.toContain('maritalStatus');
      expect(SENSITIVE_FIELDS).not.toContain('dependents');
    });
  });

  describe('ENCRYPTION_CONFIG', () => {
    it('should have correct algorithm configuration', () => {
      expect(ENCRYPTION_CONFIG.algorithm).toBe('AES-GCM');
      expect(ENCRYPTION_CONFIG.keyLength).toBe(256);
      expect(ENCRYPTION_CONFIG.ivLength).toBe(12);
    });

    it('should have reasonable limits', () => {
      expect(ENCRYPTION_CONFIG.maxInputLength).toBeGreaterThan(0);
      expect(ENCRYPTION_CONFIG.maxSensitiveFields).toBeGreaterThan(0);
      expect(ENCRYPTION_CONFIG.maxInputLength).toBeLessThan(100000); // Reasonable upper bound
      expect(ENCRYPTION_CONFIG.maxSensitiveFields).toBeLessThan(100); // Reasonable upper bound
    });

    it('should be a configuration object', () => {
      expect(ENCRYPTION_CONFIG).toBeDefined();
      expect(typeof ENCRYPTION_CONFIG).toBe('object');
    });
  });

  describe('SECURITY_POLICIES', () => {
    it('should have password policy', () => {
      expect(SECURITY_POLICIES.password).toBeDefined();
      expect(SECURITY_POLICIES.password.minLength).toBeGreaterThan(0);
      expect(typeof SECURITY_POLICIES.password.requireUppercase).toBe('boolean');
      expect(typeof SECURITY_POLICIES.password.requireLowercase).toBe('boolean');
      expect(typeof SECURITY_POLICIES.password.requireNumbers).toBe('boolean');
      expect(typeof SECURITY_POLICIES.password.requireSpecialChars).toBe('boolean');
    });

    it('should have session policy', () => {
      expect(SECURITY_POLICIES.session).toBeDefined();
      expect(SECURITY_POLICIES.session.timeoutMinutes).toBeGreaterThan(0);
      expect(SECURITY_POLICIES.session.maxConcurrentSessions).toBeGreaterThan(0);
    });

    it('should have rate limit policy', () => {
      expect(SECURITY_POLICIES.rateLimit).toBeDefined();
      expect(SECURITY_POLICIES.rateLimit.windowMs).toBeGreaterThan(0);
      expect(SECURITY_POLICIES.rateLimit.maxRequests).toBeGreaterThan(0);
      expect(SECURITY_POLICIES.rateLimit.maxAIFeatureRequests).toBeGreaterThan(0);
    });

    it('should have data retention policy', () => {
      expect(SECURITY_POLICIES.dataRetention).toBeDefined();
      expect(SECURITY_POLICIES.dataRetention.encryptedDataDays).toBeGreaterThan(0);
      expect(SECURITY_POLICIES.dataRetention.logsDays).toBeGreaterThan(0);
      expect(SECURITY_POLICIES.dataRetention.auditLogsDays).toBeGreaterThan(0);
    });

    it('should be a configuration object', () => {
      expect(SECURITY_POLICIES).toBeDefined();
      expect(typeof SECURITY_POLICIES).toBe('object');
    });
  });

  describe('Configuration Consistency', () => {
    it('should have consistent encryption settings', () => {
      // AES-GCM with 256-bit key should use 12-byte IV
      expect(ENCRYPTION_CONFIG.algorithm).toBe('AES-GCM');
      expect(ENCRYPTION_CONFIG.keyLength).toBe(256);
      expect(ENCRYPTION_CONFIG.ivLength).toBe(12);
    });

    it('should have reasonable rate limits', () => {
      // AI feature requests should be less than general requests
      expect(SECURITY_POLICIES.rateLimit.maxAIFeatureRequests).toBeLessThanOrEqual(
        SECURITY_POLICIES.rateLimit.maxRequests
      );
    });

    it('should have reasonable data retention periods', () => {
      // Audit logs should be retained longer than regular logs
      expect(SECURITY_POLICIES.dataRetention.auditLogsDays).toBeGreaterThanOrEqual(
        SECURITY_POLICIES.dataRetention.logsDays
      );
      
      // Encrypted data should be retained longer than logs
      expect(SECURITY_POLICIES.dataRetention.encryptedDataDays).toBeGreaterThanOrEqual(
        SECURITY_POLICIES.dataRetention.logsDays
      );
    });
  });
});
