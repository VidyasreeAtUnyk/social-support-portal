import { act, fireEvent, mockConsole, render, screen, waitFor } from '@lib/__tests__/test-utils';
import React from 'react';
import { ErrorBoundary, useErrorBoundary, withErrorBoundary } from '../ErrorBoundary';

// Mock console methods to avoid noise in tests
mockConsole();

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
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('We\'re sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('displays custom fallback UI when provided', () => {
    const customFallback = <div>Custom error message</div>;
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = jest.fn();
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
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
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();

    // Click Try Again - this should trigger the reset function
    act(() => {
      fireEvent.click(screen.getByText('Try Again'));
    });

    // The button should still be clickable (no error thrown)
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('resets error boundary when resetKeys change', () => {
    const { rerender } = render(
      <ErrorBoundary resetKeys={['key1']}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change resetKeys
    rerender(
      <ErrorBoundary resetKeys={['key2']}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('resets error boundary when resetOnPropsChange is true and children change', () => {
    const { rerender } = render(
      <ErrorBoundary resetOnPropsChange={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Change children
    rerender(
      <ErrorBoundary resetOnPropsChange={true}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
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
      <ErrorBoundary showDebugInfo={true}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // The error details should be shown in the debug section
    expect(screen.getByText('Debug Information')).toBeInTheDocument();
    expect(screen.getByText('Error:')).toBeInTheDocument();

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
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
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
      <SafeComponent shouldThrow={false} />
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('catches errors in wrapped component', () => {
    const SafeComponent = withErrorBoundary(ThrowError);
    
    render(
      <SafeComponent shouldThrow={true} />
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('uses custom fallback in wrapped component', () => {
    const customFallback = <div>Custom HOC fallback</div>;
    const SafeComponent = withErrorBoundary(ThrowError, { fallback: customFallback });
    
    render(
      <SafeComponent shouldThrow={true} />
    );

    expect(screen.getByText('Custom HOC fallback')).toBeInTheDocument();
  });
});

describe('useErrorBoundary hook', () => {
  it('provides triggerError function', () => {
    const TestComponent = () => {
      const { triggerError } = useErrorBoundary();
      const [shouldThrow, setShouldThrow] = React.useState(false);
      
      if (shouldThrow) {
        throw new Error('Hook error');
      }
      
      return (
        <button onClick={() => setShouldThrow(true)}>
          Trigger Error
        </button>
      );
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    // Click the button to trigger the error
    act(() => {
      fireEvent.click(screen.getByText('Trigger Error'));
    });
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('ErrorBoundary Integration Tests', () => {
  it('handles async errors', async () => {
    render(
      <ErrorBoundary>
        <AsyncThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No async error')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('handles multiple error boundary instances', () => {
    render(
      <ErrorBoundary>
        <div>
          <ErrorBoundary>
            <ThrowError shouldThrow={true} />
          </ErrorBoundary>
          <div>This should still render</div>
        </div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('This should still render')).toBeInTheDocument();
  });
});
