import '@testing-library/jest-dom';

// Polyfill for Web Crypto API in Jest environment
import { TextDecoder, TextEncoder } from 'util';

// Suppress console noise during tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = jest.fn().mockImplementation((message) => {
  // Suppress JSDOM navigation errors
  if (typeof message === 'string' && message.includes('Not implemented: navigation')) {
    return;
  }
  // Suppress other JSDOM errors
  if (typeof message === 'object' && message?.type === 'not implemented') {
    return;
  }
  // Suppress ErrorBoundary test errors (these are intentional in tests)
  if (typeof message === 'string' && (
    message.includes('ErrorBoundary caught an error') ||
    message.includes('Error:') ||
    message.includes('Error Info:') ||
    message.includes('Component Stack:') ||
    message.includes('🚨 Error Boundary Report')
  )) {
    return;
  }
  // Suppress React error logging in tests
  if (typeof message === 'string' && message.includes('%o')) {
    return;
  }
  // Log other errors for debugging
  originalConsoleError(message);
});

console.warn = jest.fn().mockImplementation((message) => {
  // Suppress MUI tooltip warnings about disabled buttons
  if (typeof message === 'string' && message.includes('MUI: You are providing a disabled')) {
    return;
  }
  // Suppress AI logging warnings (expected in tests)
  if (typeof message === 'string' && (
    message.includes('AI suggestion logging failed') ||
    message.includes('AI Error logging failed')
  )) {
    return;
  }
  // Log other warnings for debugging
  originalConsoleWarn(message);
});

// Suppress console.group calls that create noise
console.group = jest.fn();
console.groupEnd = jest.fn();
console.groupCollapsed = jest.fn();

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
