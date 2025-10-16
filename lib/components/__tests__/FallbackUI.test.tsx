import { fireEvent, render, screen } from '@testing-library/react';
import {
  ComponentErrorFallback,
  DataErrorFallback,
  FallbackUI,
  FormErrorFallback,
  LoadingErrorFallback,
  NetworkErrorFallback,
  PermissionErrorFallback,
  useFallbackUI
} from '../FallbackUI';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('FallbackUI', () => {
  beforeEach(() => {
    // Mock window.location.reload
    delete (window as any).location;
    (window as any).location = {
      reload: jest.fn(),
    };
  });

  it('renders with default props', () => {
    render(<FallbackUI />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
  });

  it('renders with custom title and message', () => {
    render(
      <FallbackUI 
        title="Custom Error" 
        message="Custom error message"
      />
    );
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('renders suggestions as chips', () => {
    const suggestions = ['Try this', 'Try that', 'Try something else'];
    
    render(
      <FallbackUI 
        suggestions={suggestions}
      />
    );
    
    expect(screen.getByText('Try these suggestions:')).toBeInTheDocument();
    suggestions.forEach(suggestion => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
  });

  it('calls onRetry when Try Again is clicked', () => {
    const onRetry = jest.fn();
    
    render(
      <FallbackUI 
        onRetry={onRetry}
      />
    );
    
    fireEvent.click(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('calls onReload when Reload Page is clicked', () => {
    const onReload = jest.fn();
    
    render(
      <FallbackUI 
        onReload={onReload}
      />
    );
    
    fireEvent.click(screen.getByText('Reload Page'));
    expect(onReload).toHaveBeenCalledTimes(1);
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
    });

    const error = new Error('Test error');
    const errorDetails = {
      error,
      componentStack: 'at Component (Component.js:10)',
      errorBoundary: 'ErrorBoundary'
    };

    render(
      <FallbackUI 
        errorDetails={errorDetails}
      />
    );
    
    expect(screen.getByText('Debug Information')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
    expect(screen.getByText('at Component (Component.js:10)')).toBeInTheDocument();

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

    const error = new Error('Test error');
    const errorDetails = {
      error,
      componentStack: 'at Component (Component.js:10)',
      errorBoundary: 'ErrorBoundary'
    };

    render(
      <FallbackUI 
        errorDetails={errorDetails}
      />
    );
    
    expect(screen.queryByText('Debug Information')).not.toBeInTheDocument();

    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
    });
  });

  it('renders with different types', () => {
    const { rerender } = render(<FallbackUI type="error" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    rerender(<FallbackUI type="warning" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    rerender(<FallbackUI type="info" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    rerender(<FallbackUI type="loading" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('can hide action buttons', () => {
    render(
      <FallbackUI 
        showRetry={false}
        showReload={false}
        showHome={false}
      />
    );
    
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    expect(screen.queryByText('Reload Page')).not.toBeInTheDocument();
    expect(screen.queryByText('Go Home')).not.toBeInTheDocument();
  });
});

describe('Pre-configured Fallback Components', () => {
  it('renders NetworkErrorFallback', () => {
    render(<NetworkErrorFallback />);
    
    expect(screen.getByText('Network Error')).toBeInTheDocument();
    expect(screen.getByText(/We're having trouble connecting to our servers/)).toBeInTheDocument();
  });

  it('renders LoadingErrorFallback', () => {
    render(<LoadingErrorFallback />);
    
    expect(screen.getByText('Loading Failed')).toBeInTheDocument();
    expect(screen.getByText(/We're having trouble loading this content/)).toBeInTheDocument();
  });

  it('renders PermissionErrorFallback', () => {
    render(<PermissionErrorFallback />);
    
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText(/You don't have permission to access this content/)).toBeInTheDocument();
  });

  it('renders DataErrorFallback', () => {
    render(<DataErrorFallback />);
    
    expect(screen.getByText('Data Error')).toBeInTheDocument();
    expect(screen.getByText(/There's an issue with the data on this page/)).toBeInTheDocument();
  });

  it('renders FormErrorFallback', () => {
    render(<FormErrorFallback />);
    
    expect(screen.getByText('Form Error')).toBeInTheDocument();
    expect(screen.getByText(/There was an error processing your form/)).toBeInTheDocument();
  });

  it('renders ComponentErrorFallback with error details', () => {
    const error = new Error('Component error');
    const componentStack = 'at Component (Component.js:10)';
    
    render(
      <ComponentErrorFallback 
        error={error}
        componentStack={componentStack}
      />
    );
    
    expect(screen.getByText('Component Error')).toBeInTheDocument();
    expect(screen.getByText(/A component on this page encountered an error/)).toBeInTheDocument();
  });
});

describe('useFallbackUI hook', () => {
  it('creates custom fallback UI', () => {
    const TestComponent = () => {
      const { createFallback } = useFallbackUI();
      const customFallback = createFallback({
        title: 'Custom Error',
        message: 'Custom error message',
        suggestions: ['Custom suggestion']
      });
      
      return <div>{customFallback}</div>;
    };

    render(<TestComponent />);
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.getByText('Custom suggestion')).toBeInTheDocument();
  });
});
