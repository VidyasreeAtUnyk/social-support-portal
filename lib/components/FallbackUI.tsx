'use client';

import { BugReport, ErrorOutline, Home, Refresh, Warning } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export interface FallbackUIProps {
  title?: string;
  message?: string;
  type?: 'error' | 'warning' | 'info' | 'loading';
  showRetry?: boolean;
  showHome?: boolean;
  showReload?: boolean;
  onRetry?: () => void;
  onReload?: () => void;
  onGoHome?: () => void;
  errorDetails?: {
    error?: Error;
    componentStack?: string;
    errorBoundary?: string;
  };
  suggestions?: string[];
  severity?: 'error' | 'warning' | 'info' | 'success';
}

/**
 * Comprehensive Fallback UI Component
 * 
 * Provides different fallback interfaces for various UI breakage scenarios:
 * - Component errors
 * - Network failures
 * - Loading states
 * - Permission issues
 * - Data corruption
 * 
 * @example
 * ```tsx
 * <FallbackUI
 *   type="error"
 *   title="Something went wrong"
 *   message="We're having trouble loading this page"
 *   suggestions={["Check your internet connection", "Try refreshing the page"]}
 *   onRetry={() => window.location.reload()}
 * />
 * ```
 */
export const FallbackUI = ({
  title = 'Something went wrong',
  message = 'We\'re sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.',
  type = 'error',
  showRetry = true,
  showHome = true,
  showReload = true,
  onRetry,
  onReload,
  onGoHome,
  errorDetails,
  suggestions = [],
  severity = 'error',
}: FallbackUIProps) => {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      router.push('/');
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <Warning />;
      case 'info':
        return <BugReport />;
      case 'loading':
        return <Refresh />;
      default:
        return <ErrorOutline />;
    }
  };

  const getSeverity = () => {
    if (severity !== 'error') return severity;
    
    switch (type) {
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'loading':
        return 'info';
      default:
        return 'error';
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Alert 
        severity={getSeverity()} 
        icon={getIcon()}
        sx={{ mb: 2 }}
      >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {message}
        </Typography>
        
        {suggestions.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium' }}>
              Try these suggestions:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {suggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Stack>
          </Box>
        )}
        
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {showRetry && (
            <Button 
              variant="outlined" 
              onClick={handleRetry} 
              size="small"
              startIcon={<Refresh />}
            >
              Try Again
            </Button>
          )}
          {showReload && (
            <Button 
              variant="contained" 
              onClick={handleReload} 
              size="small"
              startIcon={<Refresh />}
            >
              Reload Page
            </Button>
          )}
          {showHome && (
            <Button 
              variant="outlined" 
              onClick={handleGoHome} 
              size="small"
              startIcon={<Home />}
            >
              Go Home
            </Button>
          )}
        </Stack>
      </Alert>

      {errorDetails && process.env.NODE_ENV === 'development' && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Debug Information
            </Typography>
            
            {errorDetails.error && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Error:
                </Typography>
                <Typography 
                  variant="caption" 
                  component="pre" 
                  sx={{ 
                    fontSize: '0.75rem', 
                    whiteSpace: 'pre-wrap',
                    bgcolor: 'grey.100',
                    p: 1,
                    borderRadius: 1,
                    display: 'block'
                  }}
                >
                  {errorDetails.error.toString()}
                </Typography>
              </Box>
            )}
            
            {errorDetails.componentStack && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Component Stack:
                </Typography>
                <Typography 
                  variant="caption" 
                  component="pre" 
                  sx={{ 
                    fontSize: '0.75rem', 
                    whiteSpace: 'pre-wrap',
                    bgcolor: 'grey.100',
                    p: 1,
                    borderRadius: 1,
                    display: 'block'
                  }}
                >
                  {errorDetails.componentStack}
                </Typography>
              </Box>
            )}
            
            {errorDetails.errorBoundary && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Error Boundary:
                </Typography>
                <Typography variant="body2">
                  {errorDetails.errorBoundary}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

/**
 * Pre-configured fallback components for common scenarios
 */

export const NetworkErrorFallback = () => (
  <FallbackUI
    type="error"
    title="Network Error"
    message="We're having trouble connecting to our servers. Please check your internet connection and try again."
    suggestions={[
      "Check your internet connection",
      "Try refreshing the page",
      "Check if our servers are online"
    ]}
    severity="error"
  />
);

export const LoadingErrorFallback = () => (
  <FallbackUI
    type="loading"
    title="Loading Failed"
    message="We're having trouble loading this content. This might be a temporary issue."
    suggestions={[
      "Wait a moment and try again",
      "Refresh the page",
      "Check your internet connection"
    ]}
    severity="warning"
  />
);

export const PermissionErrorFallback = () => (
  <FallbackUI
    type="warning"
    title="Access Denied"
    message="You don't have permission to access this content. Please contact your administrator if you believe this is an error."
    suggestions={[
      "Contact your administrator",
      "Check your account permissions",
      "Try logging in again"
    ]}
    severity="warning"
  />
);

export const DataErrorFallback = () => (
  <FallbackUI
    type="error"
    title="Data Error"
    message="There's an issue with the data on this page. This might be due to a recent update or system maintenance."
    suggestions={[
      "Try refreshing the page",
      "Clear your browser cache",
      "Contact support if the issue persists"
    ]}
    severity="error"
  />
);

export const FormErrorFallback = () => (
  <FallbackUI
    type="error"
    title="Form Error"
    message="There was an error processing your form. Your data may not have been saved."
    suggestions={[
      "Try submitting again",
      "Check all required fields",
      "Refresh the page and try again"
    ]}
    severity="error"
  />
);

export const ComponentErrorFallback = ({ error, componentStack }: { error?: Error; componentStack?: string }) => (
  <FallbackUI
    type="error"
    title="Component Error"
    message="A component on this page encountered an error and couldn't render properly."
    suggestions={[
      "Refresh the page",
      "Try navigating away and back",
      "Contact support if the issue persists"
    ]}
    errorDetails={{ error, componentStack }}
    severity="error"
  />
);

/**
 * Hook for creating custom fallback UIs
 */
export const useFallbackUI = () => {
  const createFallback = (config: FallbackUIProps) => {
    return <FallbackUI {...config} />;
  };

  return { createFallback };
};
