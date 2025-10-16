'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import {
  ComponentErrorFallback,
  DataErrorFallback,
  FallbackUI,
  FormErrorFallback,
  LoadingErrorFallback,
  NetworkErrorFallback,
  PermissionErrorFallback
} from './FallbackUI';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackType?: 'default' | 'component' | 'network' | 'loading' | 'permission' | 'data' | 'form';
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  showDebugInfo?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the
 * component tree that crashed.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 * 
 * <ErrorBoundary
 *   fallback={<div>Something went wrong!</div>}
 *   onError={(error, errorInfo) => console.error(error)}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Log to external service (e.g., Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error boundary when resetKeys change
    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys && resetKeys.length > 0) {
        this.resetErrorBoundary();
      }
    }

    // Reset error boundary when props change (if enabled)
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // TODO: Integrate with error logging service
    // Examples:
    // - Sentry.captureException(error, { extra: errorInfo });
    // - LogRocket.captureException(error);
    // - Custom API call to log errors
    
    console.group('🚨 Error Boundary Report');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();
  };

  private resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleRetry = () => {
    this.resetErrorBoundary();
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use specific fallback type
      const fallbackType = this.props.fallbackType || 'default';
      
      switch (fallbackType) {
        case 'component':
          return (
            <ComponentErrorFallback 
              error={this.state.error || undefined}
              componentStack={this.state.errorInfo?.componentStack || undefined}
            />
          );
        case 'network':
          return <NetworkErrorFallback />;
        case 'loading':
          return <LoadingErrorFallback />;
        case 'permission':
          return <PermissionErrorFallback />;
        case 'data':
          return <DataErrorFallback />;
        case 'form':
          return <FormErrorFallback />;
        default:
          return (
            <FallbackUI
              type="error"
              title="Something went wrong"
              message="We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists."
              suggestions={[
                "Refresh the page",
                "Check your internet connection",
                "Contact support if the issue persists"
              ]}
              errorDetails={this.props.showDebugInfo ? {
                error: this.state.error || undefined,
                componentStack: this.state.errorInfo?.componentStack || undefined,
                errorBoundary: 'ErrorBoundary'
              } : undefined}
              onRetry={this.handleRetry}
              onReload={this.handleReload}
            />
          );
      }
    }

    return this.props.children;
  }
}

/**
 * Higher-order component for error boundaries
 * 
 * @example
 * ```tsx
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   fallback: <div>Error in MyComponent</div>
 * });
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for manually triggering error boundary
 * 
 * @example
 * ```tsx
 * const { triggerError } = useErrorBoundary();
 * 
 * const handleError = () => {
 *   triggerError(new Error('Manual error trigger'));
 * };
 * ```
 */
export function useErrorBoundary() {
  const triggerError = (error: Error) => {
    throw error;
  };

  return { triggerError };
}
