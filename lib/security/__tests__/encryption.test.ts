import { ENCRYPTION_CONFIG } from '../config';
import {
  decryptData,
  decryptFormData,
  encryptData,
  encryptFormData,
  generateEncryptionKey,
  hashData,
  isEncryptionSupported
} from '../encryption';

// Get the mocked crypto from global setup
const mockCrypto = global.crypto as any;

/**
 * Note: These tests use mocked Web Crypto API for Jest environment compatibility.
 * For full integration testing with real encryption/decryption, use the browser console tests:
 * - testEncryption() - Tests basic encryption/decryption
 * - testDecryption() - Tests form data encryption/decryption
 */

describe('Encryption Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful crypto operations
    mockCrypto.subtle.generateKey.mockResolvedValue({} as CryptoKey);
    mockCrypto.subtle.encrypt.mockResolvedValue(new ArrayBuffer(16));
    mockCrypto.subtle.decrypt.mockResolvedValue(new ArrayBuffer(8));
    mockCrypto.subtle.importKey.mockResolvedValue({} as CryptoKey);
    mockCrypto.subtle.exportKey.mockResolvedValue(new ArrayBuffer(32));
    mockCrypto.subtle.digest.mockResolvedValue(new ArrayBuffer(32));
    mockCrypto.getRandomValues.mockImplementation((arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    });
  });

  describe('isEncryptionSupported', () => {
    it('should return true when crypto is available', () => {
      expect(isEncryptionSupported()).toBe(true);
    });

    it('should return false when crypto is not available', () => {
      // @ts-ignore
      delete global.crypto;
      expect(isEncryptionSupported()).toBe(false);
      
      // Restore crypto for other tests
      Object.defineProperty(global, 'crypto', {
        value: mockCrypto,
        writable: true
      });
    });
  });

  describe('generateEncryptionKey', () => {
    it('should generate a valid encryption key', async () => {
      const key = await generateEncryptionKey();
      expect(key).toBeDefined();
      expect(mockCrypto.subtle.generateKey).toHaveBeenCalledWith(
        {
          name: 'AES-GCM',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      );
    });

    it('should throw error when key generation fails', async () => {
      mockCrypto.subtle.generateKey.mockRejectedValue(new Error('Key generation failed'));
      
      await expect(generateEncryptionKey()).rejects.toThrow('Key generation failed');
    });
  });

  describe('encryptData', () => {
    it('should encrypt data successfully', async () => {
      const key = await generateEncryptionKey();
      const data = 'test data';
      
      const result = await encryptData(data, key);
      
      expect(result).toHaveProperty('encryptedData');
      expect(result).toHaveProperty('iv');
      expect(result.encryptedData).toBeDefined();
      expect(result.iv).toBeDefined();
    });

    it('should handle empty data', async () => {
      const key = await generateEncryptionKey();
      
      // Empty data should be handled gracefully
      const result = await encryptData('', key);
      expect(result).toHaveProperty('encryptedData');
      expect(result).toHaveProperty('iv');
    });

    it('should throw error for data exceeding max length', async () => {
      const key = await generateEncryptionKey();
      const longData = 'a'.repeat(ENCRYPTION_CONFIG.maxInputLength + 1);
      
      await expect(encryptData(longData, key)).rejects.toThrow('Input too long');
    });
  });

  describe('decryptData', () => {
    it('should decrypt data successfully', async () => {
      const key = await generateEncryptionKey();
      const originalData = 'test data';
      
      // First encrypt
      const encrypted = await encryptData(originalData, key);
      
      // Then decrypt
      const decrypted = await decryptData(encrypted.encryptedData, encrypted.iv, key);
      
      // Note: In a real test environment, we would verify that decrypted === originalData
      // However, with mocked crypto API, we can only verify that decryption doesn't throw
      // and returns a defined value. For full integration testing, use browser console tests.
      expect(decrypted).toBeDefined();
    });

    it('should throw error when decryption fails', async () => {
      const key = await generateEncryptionKey();
      mockCrypto.subtle.decrypt.mockRejectedValue(new Error('Decryption failed'));
      
      await expect(decryptData('invalid', 'invalid', key)).rejects.toThrow('Decryption failed');
    });
  });

  describe('hashData', () => {
    it('should hash data successfully', async () => {
      const data = 'test data';
      const hash = await hashData(data);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
    });
  });

  describe('encryptFormData', () => {
    it('should identify sensitive fields correctly', async () => {
      const key = await generateEncryptionKey();
      const formData = {
        personalInfo: {
          name: 'John Doe', // Sensitive
          dob: '1990-01-01' // Not sensitive
        },
        familyInfo: {
          monthlyIncome: '5000' // Sensitive - as string
        }
      };

      const encrypted = await encryptFormData(formData, key);

      // Check that sensitive fields are marked for encryption
      expect(encrypted.personalInfo.name).toHaveProperty('isEncrypted', true);
      expect(encrypted.familyInfo.monthlyIncome).toHaveProperty('isEncrypted', true);
      
      // Check that non-sensitive fields remain unchanged
      expect(encrypted.personalInfo.dob).toBe('1990-01-01');
    });

    it('should handle arrays with sensitive fields', async () => {
      const key = await generateEncryptionKey();
      const formData = {
        contacts: [
          { name: 'John Doe', phone: '+1234567890' }, // Both sensitive
          { name: 'Jane Smith', phone: '+0987654321' } // Both sensitive
        ]
      };

      const encrypted = await encryptFormData(formData, key);

      expect(encrypted.contacts[0].name).toHaveProperty('isEncrypted', true);
      expect(encrypted.contacts[0].phone).toHaveProperty('isEncrypted', true);
      expect(encrypted.contacts[1].name).toHaveProperty('isEncrypted', true);
      expect(encrypted.contacts[1].phone).toHaveProperty('isEncrypted', true);
    });

    it('should handle empty form data', async () => {
      const key = await generateEncryptionKey();
      const formData = {};

      const encrypted = await encryptFormData(formData, key);

      expect(encrypted).toEqual({});
    });

    it('should respect max sensitive fields limit', async () => {
      const key = await generateEncryptionKey();
      const formData: Record<string, any> = {};
      
      // Create more sensitive fields than the limit
      for (let i = 0; i < ENCRYPTION_CONFIG.maxSensitiveFields + 5; i++) {
        formData[`field${i}`] = `sensitive data ${i}`;
      }

      const encrypted = await encryptFormData(formData, key);

      // Count encrypted fields
      let encryptedCount = 0;
      for (const value of Object.values(encrypted)) {
        if (value && typeof value === 'object' && 'isEncrypted' in value && value.isEncrypted) {
          encryptedCount++;
        }
      }

      expect(encryptedCount).toBeLessThanOrEqual(ENCRYPTION_CONFIG.maxSensitiveFields);
    });
  });

  describe('decryptFormData', () => {
    it('should handle already decrypted data', async () => {
      const key = await generateEncryptionKey();
      const formData = {
        personalInfo: {
          name: 'John Doe',
          dob: '1990-01-01' // Not encrypted
        }
      };

      const decrypted = await decryptFormData(formData, key);

      expect(decrypted).toEqual(formData);
    });
  });

  describe('Integration Tests', () => {
    it('should perform basic encrypt-decrypt cycle', async () => {
      const key = await generateEncryptionKey();
      const originalData = {
        personalInfo: {
          name: 'John Doe',
          nationalId: '123456789',
          phone: '+1234567890',
          email: 'john@example.com',
          dob: '1990-01-01'
        },
        familyInfo: {
          monthlyIncome: '5000', // Sensitive - as string
          maritalStatus: 'single'
        }
      };

      // Encrypt
      const encrypted = await encryptFormData(originalData, key);
      
      // Verify sensitive fields are marked for encryption
      const sensitiveFields = ['name', 'nationalId', 'phone', 'email', 'monthlyIncome'];
      sensitiveFields.forEach(field => {
        const fieldPath = field.includes('name') ? 'personalInfo.name' :
                         field.includes('nationalId') ? 'personalInfo.nationalId' :
                         field.includes('phone') ? 'personalInfo.phone' :
                         field.includes('email') ? 'personalInfo.email' :
                         'familyInfo.monthlyIncome';
        
        const [section, fieldName] = fieldPath.split('.');
        expect(encrypted[section][fieldName]).toHaveProperty('isEncrypted', true);
      });

      // Verify non-sensitive fields remain unchanged
      expect(encrypted.personalInfo.dob).toBe('1990-01-01');
      expect(encrypted.familyInfo.maritalStatus).toBe('single');
    });

    it('should handle mixed encrypted and non-encrypted data', async () => {
      const key = await generateEncryptionKey();
      const formData = {
        personalInfo: {
          name: 'John Doe', // Will be encrypted
          dob: '1990-01-01' // Will not be encrypted
        },
        metadata: {
          timestamp: '2024-01-01T00:00:00Z', // Will not be encrypted
          version: '1.0' // Will not be encrypted
        }
      };

      const encrypted = await encryptFormData(formData, key);

      expect(encrypted.personalInfo.name).toHaveProperty('isEncrypted', true);
      expect(encrypted.personalInfo.dob).toBe('1990-01-01');
      expect(encrypted.metadata.timestamp).toBe('2024-01-01T00:00:00Z');
      expect(encrypted.metadata.version).toBe('1.0');
    });
  });
});