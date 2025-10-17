/**
 * Data Encryption Utilities
 * 
 * Provides client-side encryption for sensitive form data before transmission
 * Uses Web Crypto API for secure encryption
 */

import { ENCRYPTION_CONFIG, SENSITIVE_FIELDS, type SensitiveField } from './config';

// Generate a random encryption key (in production, this should be server-side)
export const generateEncryptionKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.generateKey(
    {
      name: ENCRYPTION_CONFIG.algorithm,
      length: ENCRYPTION_CONFIG.keyLength,
    },
    true, // extractable
    ['encrypt', 'decrypt']
  );
};

// Encrypt sensitive data
export const encryptData = async (
  data: string,
  key: CryptoKey
): Promise<{ encryptedData: string; iv: string }> => {
  // Validate input length
  if (data.length > ENCRYPTION_CONFIG.maxInputLength) {
    throw new Error(`Input too long: ${data.length} > ${ENCRYPTION_CONFIG.maxInputLength}`);
  }

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(ENCRYPTION_CONFIG.ivLength));
  
  // Encrypt the data
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: ENCRYPTION_CONFIG.algorithm,
      iv: iv,
    },
    key,
    dataBuffer
  );
  
  // Convert to base64 strings for transmission
  const encryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
  const ivString = btoa(String.fromCharCode(...iv));
  
  return { encryptedData, iv: ivString };
};

// Decrypt sensitive data
export const decryptData = async (
  encryptedData: string,
  iv: string,
  key: CryptoKey
): Promise<string> => {
  // Convert base64 strings back to buffers
  const encryptedBuffer = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
  
  // Decrypt the data
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: ENCRYPTION_CONFIG.algorithm,
      iv: ivBuffer,
    },
    key,
    encryptedBuffer
  );
  
  // Convert back to string
  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};

// Hash sensitive data for comparison (one-way)
export const hashData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Check if Web Crypto API is available
export const isEncryptionSupported = (): boolean => {
  return typeof window !== 'undefined' && 
         'crypto' in window && 
         'subtle' in window.crypto;
};

// Encrypt sensitive fields in form data (handles nested structures)
export const encryptFormData = async (
  formData: Record<string, any>,
  key: CryptoKey
): Promise<Record<string, any>> => {
  const encryptedData: Record<string, any> = {};
  let encryptedFieldCount = 0;
  
  // Recursive function to encrypt nested objects
  const encryptNestedData = async (data: any, path: string = ''): Promise<any> => {
    if (typeof data === 'string' && data.trim()) {
      // Check if this field should be encrypted
      const fieldName = path.split('.').pop() || '';
      if (SENSITIVE_FIELDS.includes(fieldName as SensitiveField)) {
        // Check field count limit
        if (encryptedFieldCount >= ENCRYPTION_CONFIG.maxSensitiveFields) {
          console.warn(`Maximum sensitive fields limit reached: ${ENCRYPTION_CONFIG.maxSensitiveFields}`);
          return data; // Return original data if limit reached
        }
        
        try {
          const { encryptedData: encrypted, iv } = await encryptData(data, key);
          encryptedFieldCount++;
          return {
            encrypted: encrypted,
            iv: iv,
            isEncrypted: true
          };
        } catch (error) {
          console.error(`Failed to encrypt field ${path}:`, error);
          return data; // Fallback to original value
        }
      }
      return data;
    }
    
    if (Array.isArray(data)) {
      const encryptedArray = [];
      for (let i = 0; i < data.length; i++) {
        encryptedArray[i] = await encryptNestedData(data[i], `${path}[${i}]`);
      }
      return encryptedArray;
    }
    
    if (data && typeof data === 'object') {
      const encryptedObject: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        const newPath = path ? `${path}.${key}` : key;
        encryptedObject[key] = await encryptNestedData(value, newPath);
      }
      return encryptedObject;
    }
    
    return data;
  };
  
  // Process the entire form data structure
  for (const [section, sectionData] of Object.entries(formData)) {
    encryptedData[section] = await encryptNestedData(sectionData, section);
  }
  
  return encryptedData;
};

// Decrypt sensitive fields in form data (handles nested structures)
export const decryptFormData = async (
  encryptedFormData: Record<string, any>,
  key: CryptoKey
): Promise<Record<string, any>> => {
  const decryptedData: Record<string, any> = {};
  
  // Recursive function to decrypt nested objects
  const decryptNestedData = async (data: any): Promise<any> => {
    if (data && typeof data === 'object' && data.isEncrypted && data.encrypted && data.iv) {
      try {
        return await decryptData(data.encrypted, data.iv, key);
      } catch (error) {
        console.error(`Failed to decrypt field:`, error);
        return data; // Fallback to original value
      }
    }
    
    if (Array.isArray(data)) {
      const decryptedArray = [];
      for (let i = 0; i < data.length; i++) {
        decryptedArray[i] = await decryptNestedData(data[i]);
      }
      return decryptedArray;
    }
    
    if (data && typeof data === 'object') {
      const decryptedObject: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        decryptedObject[key] = await decryptNestedData(value);
      }
      return decryptedObject;
    }
    
    return data;
  };
  
  // Process the entire form data structure
  for (const [section, sectionData] of Object.entries(encryptedFormData)) {
    decryptedData[section] = await decryptNestedData(sectionData);
  }
  
  return decryptedData;
};

// Export sensitive fields for external use
export { SENSITIVE_FIELDS, type SensitiveField };
