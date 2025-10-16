import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary, useErrorBoundary, withErrorBoundary } from '../ErrorBoundary';

// Mock console methods to avoid noise in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Test theme provider
const theme = createTheme();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

// Component that throws an error after a delay
const AsyncThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  const [hasError, setHasError] = React.useState(false);
  
  React.useEffect(() => {
    if (shouldThrow) {
      const timer = setTimeout(() => {
        setHasError(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldThrow]);

  if (hasError) {
    throw new Error('Async test error');
  }
  
  return <div>No async error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We\'re sorry, but something unexpected happened.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('displays custom fallback UI when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <TestWrapper>
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = jest.fn();
    
    render(
      <TestWrapper>
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error',
      }),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('resets error boundary when Try Again is clicked', () => {
    const { rerender } = render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click Try Again
    fireEvent.click(screen.getByText('Try Again'));

    // Rerender with no error
    rerender(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('resets error boundary when resetKeys change', () => {
    const { rerender } = render(
      <TestWrapper>
        <ErrorBoundary resetKeys={['key1']}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change resetKeys
    rerender(
      <TestWrapper>
        <ErrorBoundary resetKeys={['key2']}>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('resets error boundary when resetOnPropsChange is true and children change', () => {
    const { rerender } = render(
      <TestWrapper>
        <ErrorBoundary resetOnPropsChange={true}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change children
    rerender(
      <TestWrapper>
        <ErrorBoundary resetOnPropsChange={true}>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
    });

    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
    });
  });

  it('does not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true,
    });

    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
    });
  });
});

describe('withErrorBoundary HOC', () => {
  it('wraps component with error boundary', () => {
    const SafeComponent = withErrorBoundary(ThrowError);
    
    render(
      <TestWrapper>
        <SafeComponent shouldThrow={false} />
      </TestWrapper>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('catches errors in wrapped component', () => {
    const SafeComponent = withErrorBoundary(ThrowError);
    
    render(
      <TestWrapper>
        <SafeComponent shouldThrow={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('uses custom fallback in wrapped component', () => {
    const customFallback = <div>Custom HOC fallback</div>;
    const SafeComponent = withErrorBoundary(ThrowError, { fallback: customFallback });
    
    render(
      <TestWrapper>
        <SafeComponent shouldThrow={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Custom HOC fallback')).toBeInTheDocument();
  });
});

describe('useErrorBoundary hook', () => {
  it('provides triggerError function', () => {
    const TestComponent = () => {
      const { triggerError } = useErrorBoundary();
      
      return (
        <button onClick={() => triggerError(new Error('Hook error'))}>
          Trigger Error
        </button>
      );
    };

    render(
      <TestWrapper>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Trigger Error'));
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('ErrorBoundary Integration Tests', () => {
  it('handles async errors', async () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <AsyncThrowError shouldThrow={true} />
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('No async error')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles multiple error boundary instances', () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <div>
            <ErrorBoundary>
              <ThrowError shouldThrow={true} />
            </ErrorBoundary>
            <div>This should still render</div>
          </div>
        </ErrorBoundary>
      </TestWrapper>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('This should still render')).toBeInTheDocument();
  });
});
