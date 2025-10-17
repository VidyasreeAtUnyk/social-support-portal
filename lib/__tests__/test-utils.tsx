import { createTheme, ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions } from '@testing-library/react';
import { NextRouter } from 'next/router';
import React from 'react';

// Mock Next.js router
const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
  withRouter: (Component: any) => Component,
}));

// Mock window.location - use a simpler approach that doesn't conflict with JSDOM
// Just suppress the navigation errors instead of trying to redefine location
(window as any).location = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Mock window.history
Object.defineProperty(window, 'history', {
  value: {
    pushState: jest.fn(),
    replaceState: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  },
  writable: true,
});

// Create test theme
const testTheme = createTheme();

// Test wrapper component
interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <ThemeProvider theme={testTheme}>
      {children}
    </ThemeProvider>
  );
};

// Custom render function
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test utilities
export const createMockFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export const createMockError = (message: string = 'Test error') => {
  const error = new Error(message);
  error.stack = 'Error: Test error\n    at test (test.js:1:1)';
  return error;
};

export const mockConsole = () => {
  const originalConsole = { ...console };
  
  beforeEach(() => {
    // Suppress specific JSDOM errors and MUI warnings
    console.error = jest.fn().mockImplementation((message) => {
      // Suppress JSDOM navigation errors
      if (typeof message === 'string' && message.includes('Not implemented: navigation')) {
        return;
      }
      // Suppress other JSDOM errors
      if (typeof message === 'object' && message?.type === 'not implemented') {
        return;
      }
      // Log other errors for debugging
      originalConsole.error(message);
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
      originalConsole.warn(message);
    });
    
    console.log = jest.fn();
  });
  
  afterEach(() => {
    Object.assign(console, originalConsole);
  });
};

// Mock i18n for tests
export const mockI18n = {
  t: (key: string, options?: any) => {
    // Simple mock translation - returns the key with interpolated values
    if (key && typeof key === 'string') {
      if (options) {
        return key.replace(/\{\{(\w+)\}\}/g, (match, key) => options[key] || match);
      }
      return key;
    }
    return key || '';
  },
  changeLanguage: jest.fn(),
  language: 'en',
  languages: ['en', 'ar'],
  isInitialized: true,
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockI18n.t,
    i18n: mockI18n,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock Redux store for tests
export const createMockStore = (initialState: any = {}) => ({
  getState: jest.fn(() => initialState),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
});

// Mock Redux hooks
jest.mock('@lib/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) => selector({
    form: {
      currentStep: 1,
      personalInfo: {},
      familyInfo: {},
      situationDescription: {},
    },
  }),
}));

// Mock toast context
jest.mock('@lib/context/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn(),
    hideToast: jest.fn(),
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock encryption hooks
jest.mock('@lib/hooks/useFormEncryption', () => ({
  useFormEncryption: () => ({
    encryptData: jest.fn().mockResolvedValue({ encryptedData: 'encrypted', iv: 'iv' }),
    decryptData: jest.fn().mockResolvedValue('decrypted'),
    isSupported: true,
  }),
}));

// Mock form hooks
jest.mock('@lib/hooks/useSocialSupportForm', () => ({
  useSocialSupportForm: () => ({
    form: {
      getValues: jest.fn(() => ({})),
      setValue: jest.fn(),
      watch: jest.fn(),
      handleSubmit: jest.fn(),
      formState: { errors: {} },
    },
    validateStep: jest.fn().mockReturnValue(true),
    clearForm: jest.fn(),
  }),
}));

// Mock translated toast hook
jest.mock('@lib/hooks/useTranslatedToast', () => ({
  useTranslatedToast: () => ({
    showSuccessToast: jest.fn(),
    showErrorToast: jest.fn(),
  }),
}));

// Export mock objects for use in tests
export { mockI18n, mockRouter };

