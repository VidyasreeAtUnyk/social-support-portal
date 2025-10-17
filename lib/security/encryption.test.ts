/**
 * Test file to verify encryption functionality
 * Run this in browser console to test encryption
 */

import { SENSITIVE_FIELDS as CONFIG_SENSITIVE_FIELDS } from './config';
import {
  decryptData,
  encryptData,
  encryptFormData,
  generateEncryptionKey,
  isEncryptionSupported,
  SENSITIVE_FIELDS
} from './encryption';

// Test encryption functionality
export const testEncryption = async () => {
  console.log('🔒 Testing Encryption Functionality...');
  
  // Check if encryption is supported
  const supported = isEncryptionSupported();
  console.log('✅ Encryption supported:', supported);
  
  if (!supported) {
    console.warn('❌ Web Crypto API not available');
    return;
  }
  
  try {
    // Generate encryption key
    console.log('🔑 Generating encryption key...');
    const key = await generateEncryptionKey();
    console.log('✅ Encryption key generated');
    
    // Test basic encryption/decryption
    const testData = 'This is sensitive data that should be encrypted';
    console.log('📝 Original data:', testData);
    
    const { encryptedData, iv } = await encryptData(testData, key);
    console.log('🔒 Encrypted data:', encryptedData);
    console.log('🔑 IV:', iv);
    
    const decryptedData = await decryptData(encryptedData, iv, key);
    console.log('🔓 Decrypted data:', decryptedData);
    
    // Verify data integrity
    const isCorrect = testData === decryptedData;
    console.log('✅ Data integrity check:', isCorrect ? 'PASSED' : 'FAILED');
    
    // Test form data encryption with nested structure
    console.log('📋 Testing form data encryption with nested structure...');
    const formData = {
      personalInfo: {
        name: 'John Doe',
        nationalId: '123456789',
        address: '123 Main St',
        phone: '+1234567890',
        email: 'john@example.com',
        // Non-sensitive data
        dob: '1990-01-01',
        gender: 'male'
      },
      familyInfo: {
        monthlyIncome: 5000,
        // Non-sensitive data
        maritalStatus: 'single',
        dependents: 2
      },
      situationDescriptions: {
        financialSituation: 'I am struggling financially',
        employmentCircumstances: 'I lost my job recently',
        reasonForApplying: 'I need financial assistance'
      }
    };
    
    console.log('📝 Original form data:', formData);
    
    const encryptedFormData = await encryptFormData(formData, key);
    console.log('🔒 Encrypted form data:', encryptedFormData);
    
    // Check which fields were encrypted (recursively)
    const findEncryptedFields = (obj: any, path: string = ''): string[] => {
      const encryptedFields: string[] = [];
      
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (value && typeof value === 'object' && 'isEncrypted' in value && value.isEncrypted) {
          encryptedFields.push(currentPath);
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          encryptedFields.push(...findEncryptedFields(value, currentPath));
        }
      }
      
      return encryptedFields;
    };
    
    const encryptedFields = findEncryptedFields(encryptedFormData);
    
    console.log('🔒 Encrypted fields:', encryptedFields);
    console.log('📋 Expected sensitive fields:', SENSITIVE_FIELDS);
    console.log('📋 Config sensitive fields:', CONFIG_SENSITIVE_FIELDS);
    
    const allSensitiveFieldsEncrypted = SENSITIVE_FIELDS.every(field => 
      encryptedFields.includes(field)
    );
    
    console.log('✅ All sensitive fields encrypted:', allSensitiveFieldsEncrypted ? 'PASSED' : 'FAILED');
    
    // Test configuration consistency
    const configConsistent = JSON.stringify(SENSITIVE_FIELDS) === JSON.stringify(CONFIG_SENSITIVE_FIELDS);
    console.log('✅ Configuration consistency:', configConsistent ? 'PASSED' : 'FAILED');
    
    console.log('🎉 Encryption test completed successfully!');
    
  } catch (error) {
    console.error('❌ Encryption test failed:', error);
  }
};

// Test decryption functionality
export const testDecryption = async () => {
  console.log('🔓 Testing Decryption Functionality...');
  
  const supported = isEncryptionSupported();
  console.log('✅ Encryption supported:', supported);
  
  if (!supported) {
    console.warn('❌ Web Crypto API not available');
    return;
  }
  
  try {
    // Generate encryption key
    const key = await generateEncryptionKey();
    console.log('✅ Encryption key generated');
    
    // Test data with nested structure
    const testData = {
      personalInfo: {
        name: 'John Doe',
        nationalId: '123456789',
        phone: '+1234567890',
        email: 'john@example.com',
        dob: '1990-01-01'  // Not sensitive
      },
      familyInfo: {
        monthlyIncome: '5000', // Sensitive - as string
        maritalStatus: 'single'  // Not sensitive
      },
      situationDescriptions: {
        financialSituation: 'I am struggling financially',
        employmentCircumstances: 'I lost my job recently',
        reasonForApplying: 'I need financial assistance'
      }
    };
    
    console.log('📝 Original data:', testData);
    
    // Encrypt
    const encrypted = await encryptFormData(testData, key);
    console.log('🔒 Encrypted data:', encrypted);
    
    // Decrypt
    const decrypted = await decryptFormData(encrypted, key);
    console.log('🔓 Decrypted data:', decrypted);
    
    // Verify data integrity
    const isCorrect = JSON.stringify(testData) === JSON.stringify(decrypted);
    console.log('✅ Data integrity check:', isCorrect ? 'PASSED' : 'FAILED');
    
    // Check specific fields
    console.log('🔍 Field-by-field verification:');
    console.log('  Name:', testData.personalInfo.name === decrypted.personalInfo.name ? '✅' : '❌');
    console.log('  National ID:', testData.personalInfo.nationalId === decrypted.personalInfo.nationalId ? '✅' : '❌');
    console.log('  Phone:', testData.personalInfo.phone === decrypted.personalInfo.phone ? '✅' : '❌');
    console.log('  Email:', testData.personalInfo.email === decrypted.personalInfo.email ? '✅' : '❌');
    console.log('  Monthly Income:', testData.familyInfo.monthlyIncome === decrypted.familyInfo.monthlyIncome ? '✅' : '❌');
    console.log('  Financial Situation:', testData.situationDescriptions.financialSituation === decrypted.situationDescriptions.financialSituation ? '✅' : '❌');
    
    // Check non-sensitive fields remain unchanged
    console.log('🔍 Non-sensitive field verification:');
    console.log('  DOB:', testData.personalInfo.dob === decrypted.personalInfo.dob ? '✅' : '❌');
    console.log('  Marital Status:', testData.familyInfo.maritalStatus === decrypted.familyInfo.maritalStatus ? '✅' : '❌');
    
    console.log('🎉 Decryption test completed successfully!');
    
  } catch (error) {
    console.error('❌ Decryption test failed:', error);
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testEncryption = testEncryption;
  (window as any).testDecryption = testDecryption;
}
