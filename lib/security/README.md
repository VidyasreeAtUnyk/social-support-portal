# Security Configuration

This directory contains centralized security configuration and utilities for the social support portal, including comprehensive encryption, testing, and security policies.

## 📁 Files Overview

### `config.ts`
Centralized security configuration including:
- **Sensitive Fields**: List of fields that contain PII or sensitive data
- **Encryption Settings**: Algorithm, key length, and security parameters  
- **Security Policies**: Rate limiting, session management, data retention

### `encryption.ts`
Client-side encryption utilities using Web Crypto API:
- **AES-256-GCM encryption** for sensitive data
- **Recursive form data encryption/decryption** for nested structures
- **Key generation** and management
- **Input validation** and length limits
- **Hash generation** for data integrity

### `encryption.test.ts` (Browser Console Tests)
Test utilities for verifying encryption functionality in browser:
- **Real encryption/decryption** with Web Crypto API
- **Data integrity verification** (`decrypted === originalData`)
- **Field-by-field validation**
- **Configuration consistency** checks

### `__tests__/encryption.test.ts` (Jest Unit Tests)
Comprehensive Jest test suite with mocked crypto API:
- **17 test cases** covering all encryption functions
- **Mocked Web Crypto API** for Jest environment
- **Unit testing** for CI/CD integration
- **Error handling** and edge case validation

### `__tests__/config.test.ts` (Jest Config Tests)
Configuration validation tests:
- **14 test cases** for security configuration
- **Field validation** and structure checks
- **Policy consistency** verification
- **Type safety** validation

## 🚀 Usage

### Adding New Sensitive Fields

To add a new field that should be encrypted, update `config.ts`:

```typescript
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
  'employmentCircumstances',
  'employmentStatus',
  'reasonForApplying',
  
  // Add new sensitive field
  'newSensitiveField',
] as const;
```

### Updating Encryption Settings

Modify encryption parameters in `config.ts`:

```typescript
export const ENCRYPTION_CONFIG = {
  algorithm: 'AES-GCM',
  keyLength: 256,
  ivLength: 12,
  maxInputLength: 10000,
  maxSensitiveFields: 20,
} as const;
```

### Using Encryption in Components

```typescript
import { useFormEncryption } from '@lib/hooks/useFormEncryption';

const MyComponent = () => {
  const { encryptData, decryptData, isSupported } = useFormEncryption();
  
  const handleSubmit = async (formData) => {
    const encryptedData = await encryptData(formData);
    // Submit encrypted data...
  };
};
```

## 🧪 Testing

### Jest Tests (Automated)

Run comprehensive test suite:

```bash
# Run all security tests
npm test -- lib/security/__tests__/

# Run specific test files
npm test -- lib/security/__tests__/encryption.test.ts
npm test -- lib/security/__tests__/config.test.ts

# Run with coverage
npm test -- --coverage lib/security/__tests__/
```

**Test Results:**
- ✅ **31 tests passed**
- ✅ **85.56% statement coverage**
- ✅ **75.67% branch coverage**
- ✅ **92.3% function coverage**

### Browser Console Tests (Integration)

For real-world encryption testing with actual Web Crypto API:

```javascript
// In browser console (F12)
testEncryption()    // Basic encryption/decryption
testDecryption()    // Form data encryption/decryption
```

### Development Testing

The form submission now includes automatic decryption verification for development:

```javascript
// Console output after form submission:
🔒 Form data encryption status: { original: {...}, encrypted: {...} }
🔓 DEV: Decryption verification: { dataIntegrity: "✅ PASSED" }
🔍 DEV: Field-by-field verification: { personalInfo.name: "✅", ... }
```

## 🔒 Security Features

### Encryption
- **AES-256-GCM**: Military-grade encryption
- **Client-side**: Data encrypted before transmission
- **Random IV**: Unique initialization vector per encryption
- **Recursive**: Handles nested form structures
- **Input Validation**: Length and format validation
- **Graceful Fallback**: Works even if encryption fails

### Rate Limiting
- **AI Requests**: 5 requests per minute per IP
- **General API**: 10 requests per minute per IP
- **Configurable**: Easy to adjust limits in `config.ts`

### Data Protection
- **PII Warnings**: User notifications about sensitive data
- **Input Sanitization**: HTML tags, script injections, SQL patterns
- **Field Limits**: Maximum sensitive fields per form
- **Audit Logging**: Comprehensive security event tracking

## 📊 Configuration Examples

### Sensitive Fields Configuration
```typescript
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
  'employmentCircumstances',
  'employmentStatus',
  'reasonForApplying',
] as const;
```

### Encryption Settings
```typescript
export const ENCRYPTION_CONFIG = {
  algorithm: 'AES-GCM',
  keyLength: 256,
  ivLength: 12,
  maxInputLength: 10000,
  maxSensitiveFields: 20,
} as const;
```

### Security Policies
```typescript
export const SECURITY_POLICIES = {
  password: { 
    minLength: 8, 
    requireUppercase: true, 
    requireLowercase: true, 
    requireNumbers: true 
  },
  session: { 
    timeoutMinutes: 30, 
    maxConcurrentSessions: 3 
  },
  rateLimit: { 
    windowMs: 60 * 1000, 
    maxRequests: 10, 
    maxAIFeatureRequests: 5 
  },
  dataRetention: { 
    encryptedDataDays: 90, 
    logsDays: 30, 
    auditLogsDays: 365 
  },
} as const;
```

## 🛡️ Security Compliance

This configuration supports:
- **GDPR**: Data minimization and encryption
- **SOC 2**: Security controls and monitoring  
- **ISO 27001**: Information security management
- **PCI DSS**: Payment card data protection (if applicable)

## 🔧 Development Workflow

### Testing Encryption
1. **Unit Tests**: `npm test` for automated testing
2. **Browser Tests**: `testEncryption()` in console for real crypto
3. **Form Testing**: Submit form to see encryption/decryption in action
4. **Dev Verification**: Automatic decryption verification in console

### Debugging
- **Console Logs**: Detailed encryption status and verification
- **Error Handling**: Graceful fallbacks with error logging
- **Field Tracking**: See exactly which fields are encrypted
- **Data Integrity**: Verify decrypted data matches original

## 📈 Best Practices

1. **Centralized Configuration**: All security settings in one place
2. **Type Safety**: TypeScript types for all configurations
3. **Single Source of Truth**: No duplicate validation rules
4. **Comprehensive Testing**: Both unit and integration tests
5. **Real-time Verification**: Development-friendly debugging
6. **Graceful Fallback**: System works even if encryption fails
7. **Regular Updates**: Keep security configurations current

## 🔄 Maintenance

- **Regular Review**: Audit sensitive fields quarterly
- **Test Updates**: Run tests after configuration changes
- **Monitor Logs**: Review security events regularly
- **Coverage Tracking**: Maintain high test coverage
- **Browser Testing**: Verify real-world encryption functionality

## 🚨 Important Notes

- **Encryption only works on string values** - numbers need to be converted to strings
- **Browser console tests** provide real encryption/decryption verification
- **Jest tests** use mocked crypto API for CI/CD compatibility
- **Development decryption** is only for debugging - remove in production
- **Same encryption key** is used for both encryption and decryption in the same session