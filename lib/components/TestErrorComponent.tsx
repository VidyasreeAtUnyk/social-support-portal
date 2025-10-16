'use client';

import { ErrorBoundary, useErrorBoundary } from '@lib/components/ErrorBoundary';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Test Error Component
 * 
 * A component designed to trigger various types of errors for testing
 * error boundaries and error handling mechanisms.
 * 
 * @example
 * ```tsx
 * <TestErrorComponent />
 * ```
 */
export const TestErrorComponent = () => {
  const { triggerError } = useErrorBoundary();
  const [shouldThrow, setShouldThrow] = useState(false);

  // Component that throws an error
  const ThrowError = () => {
    if (shouldThrow) {
      throw new Error('Test error from TestErrorComponent');
    }
    return null;
  };

  const handleSyncError = () => {
    triggerError(new Error('Synchronous error triggered'));
  };

  const handleAsyncError = () => {
    setTimeout(() => {
      triggerError(new Error('Asynchronous error triggered'));
    }, 100);
  };

  const handleRenderError = () => {
    setShouldThrow(true);
  };

  const handleTypeError = () => {
    // This will cause a TypeError
    (null as any).someMethod();
  };

  const handleReferenceError = () => {
    // This will cause a ReferenceError
    (undefined as any).someUndefinedVariable.someProperty;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Error Boundary Test Component
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 3 }}>
        Click the buttons below to test different types of errors and see how the error boundary handles them.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleSyncError}
        >
          Trigger Synchronous Error
        </Button>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleAsyncError}
        >
          Trigger Asynchronous Error
        </Button>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleRenderError}
        >
          Trigger Render Error
        </Button>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleTypeError}
        >
          Trigger TypeError
        </Button>

        <Button 
          variant="contained" 
          color="error" 
          onClick={handleReferenceError}
        >
          Trigger ReferenceError
        </Button>
      </Box>

      {/* Component that can throw during render */}
      <ThrowError />
    </Box>
  );
};

/**
 * Wrapped Test Error Component with Error Boundary
 * 
 * This component wraps the TestErrorComponent with an ErrorBoundary
 * to demonstrate error boundary functionality.
 * 
 * @example
 * ```tsx
 * <TestErrorComponentWithBoundary />
 * ```
 */
export const TestErrorComponentWithBoundary = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.log('Error caught by boundary:', error);
        console.log('Error info:', errorInfo);
      }}
    >
      <TestErrorComponent />
    </ErrorBoundary>
  );
};
