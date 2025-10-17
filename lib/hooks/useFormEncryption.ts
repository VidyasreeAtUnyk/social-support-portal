'use client';

import {
  decryptFormData,
  encryptFormData,
  generateEncryptionKey,
  isEncryptionSupported
} from '@lib/security/encryption';
import { useCallback, useEffect, useState } from 'react';

// Use the built-in CryptoKey type from Web Crypto API
type CryptoKey = globalThis.CryptoKey;

/**
 * Hook for managing form data encryption
 * 
 * Provides encryption/decryption capabilities for sensitive form data
 * Uses Web Crypto API for client-side encryption
 */
export const useFormEncryption = () => {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize encryption key
  useEffect(() => {
    const initializeEncryption = async () => {
      try {
        const supported = isEncryptionSupported();
        setIsSupported(supported);
        
        if (supported) {
          const key = await generateEncryptionKey();
          setEncryptionKey(key);
        }
      } catch (error) {
        console.error('Failed to initialize encryption:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeEncryption();
  }, []);

  // Encrypt form data before submission
  const encryptData = useCallback(async (formData: Record<string, any>) => {
    if (!encryptionKey || !isSupported) {
      console.warn('Encryption not available, submitting unencrypted data');
      return formData;
    }

    try {
      return await encryptFormData(formData, encryptionKey);
    } catch (error) {
      console.error('Failed to encrypt form data:', error);
      return formData; // Fallback to unencrypted
    }
  }, [encryptionKey, isSupported]);

  // Decrypt form data for display
  const decryptData = useCallback(async (encryptedData: Record<string, any>) => {
    if (!encryptionKey || !isSupported) {
      return encryptedData;
    }

    try {
      return await decryptFormData(encryptedData, encryptionKey);
    } catch (error) {
      console.error('Failed to decrypt form data:', error);
      return encryptedData; // Fallback to encrypted data
    }
  }, [encryptionKey, isSupported]);

  return {
    encryptData,
    decryptData,
    isSupported,
    isLoading,
    hasEncryptionKey: !!encryptionKey
  };
};
