import '@testing-library/jest-dom';

// Polyfill for Web Crypto API in Jest environment
import { TextDecoder, TextEncoder } from 'util';

// Mock Web Crypto API
const mockCrypto = {
  subtle: {
    generateKey: jest.fn(),
    encrypt: jest.fn(),
    decrypt: jest.fn(),
    importKey: jest.fn(),
    exportKey: jest.fn(),
    digest: jest.fn()
  },
  getRandomValues: jest.fn()
};

// Make TextEncoder/TextDecoder available globally
Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
  writable: true
});

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder,
  writable: true
});

// Make crypto available globally
Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true
});
