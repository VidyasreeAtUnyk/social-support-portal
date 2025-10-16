'use client';

import { ErrorBoundary } from '@lib/components/ErrorBoundary';
import {
  ComponentErrorFallback,
  DataErrorFallback,
  FormErrorFallback,
  LoadingErrorFallback,
  NetworkErrorFallback,
  PermissionErrorFallback,
  useFallbackUI
} from '@lib/components/FallbackUI';
import { TestErrorComponentWithBoundary } from '@lib/components/TestErrorComponent';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';

/**
 * Comprehensive Error Boundary & Fallback UI Test Page
 * 
 * This page demonstrates:
 * 1. Error boundary functionality (catching errors, resetting, etc.)
 * 2. All different fallback UI components and configurations
 * 3. Different error scenarios and recovery options
 * 
 * Access via: /test-fallbacks
 */
export default function TestFallbacksPage() {
  const [showCustomFallback, setShowCustomFallback] = useState(false);
  const { createFallback } = useFallbackUI();

  const customFallback = createFallback({
    type: 'warning',
    title: 'Custom Fallback',
    message: 'This is a custom fallback UI created using the useFallbackUI hook.',
    suggestions: [
      'This demonstrates custom fallback creation',
      'You can customize all aspects',
      'Perfect for specific error scenarios'
    ],
    severity: 'warning'
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Error Boundary & Fallback UI Testing
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          This comprehensive test page demonstrates both error boundary functionality and 
          fallback UI components. Error boundaries catch JavaScript errors anywhere in the 
          component tree, while fallback UIs provide user-friendly error recovery interfaces.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Explore the sections below to understand how errors are handled and how users 
          can recover from different types of failures.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Error Boundary vs Fallback UI Explanation */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Understanding Error Boundaries vs Fallback UIs
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                🛡️ Error Boundaries
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>What they do:</strong> Catch JavaScript errors anywhere in the component tree, 
                log those errors, and display a fallback UI instead of the component tree that crashed.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>When they trigger:</strong> During rendering, in lifecycle methods, 
                and in constructors of the whole tree below them.
              </Typography>
              <Typography variant="body2">
                <strong>Key features:</strong> Error catching, logging, recovery, reset functionality
              </Typography>
            </Box>
            
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Typography variant="subtitle2" gutterBottom color="secondary">
                🎨 Fallback UIs
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>What they do:</strong> Provide user-friendly interfaces when errors occur, 
                offering recovery options and context-specific guidance.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>When they're used:</strong> Displayed by error boundaries when errors are caught, 
                or used directly for specific error scenarios.
              </Typography>
              <Typography variant="body2">
                <strong>Key features:</strong> Context-aware messaging, recovery actions, 
                suggestions, debug information
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Pre-configured Fallbacks */}
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardHeader title="Pre-configured Fallbacks" />
              <CardContent>
                <Stack spacing={2}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setShowCustomFallback(!showCustomFallback)}
                    fullWidth
                  >
                    Toggle Custom Fallback
                  </Button>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Available Fallback Types:
                  </Typography>
                  
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip label="Network Error" color="error" size="small" />
                    <Chip label="Loading Error" color="warning" size="small" />
                    <Chip label="Permission Error" color="warning" size="small" />
                    <Chip label="Data Error" color="error" size="small" />
                    <Chip label="Form Error" color="error" size="small" />
                    <Chip label="Component Error" color="error" size="small" />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Error Boundary Types */}
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardHeader title="Error Boundary Types" />
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="body2">
                    Error boundaries can be configured with different fallback types:
                  </Typography>
                  
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>default:</strong> Generic error fallback
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>component:</strong> Component-specific error
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>network:</strong> Network connectivity issues
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>loading:</strong> Loading failures
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>permission:</strong> Access denied scenarios
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>data:</strong> Data corruption issues
                    </Typography>
                    <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                      <strong>form:</strong> Form submission errors
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>

      {/* Custom Fallback Demo */}
      {showCustomFallback && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Custom Fallback UI Demo
          </Typography>
          {customFallback}
        </Paper>
      )}

      {/* Pre-configured Fallback Demos */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Network Error Fallback
            </Typography>
            <NetworkErrorFallback />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loading Error Fallback
            </Typography>
            <LoadingErrorFallback />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Permission Error Fallback
            </Typography>
            <PermissionErrorFallback />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Data Error Fallback
            </Typography>
            <DataErrorFallback />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Form Error Fallback
            </Typography>
            <FormErrorFallback />
          </Paper>
        </Box>

        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Component Error Fallback
            </Typography>
            <ComponentErrorFallback 
              error={new Error('Example component error')}
              componentStack="at Component (Component.js:10)\nat ErrorBoundary (ErrorBoundary.js:5)"
            />
          </Paper>
        </Box>
      </Box>

      {/* Error Boundary Testing */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Error Boundary Testing
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          Test different error boundary configurations by triggering errors in the components below. 
          Each error boundary uses a different fallback type to demonstrate the variety of error handling approaches.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, fontStyle: 'italic' }}>
          💡 <strong>Tip:</strong> Click the "Throw Error" buttons to see how each error boundary 
          catches and handles errors with different fallback UIs.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Default Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Generic error handling with standard fallback UI
              </Typography>
              <ErrorBoundary fallbackType="default">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Component Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Component-specific error handling with debug info
              </Typography>
              <ErrorBoundary fallbackType="component">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Form Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Form-specific error handling with data recovery options
              </Typography>
              <ErrorBoundary fallbackType="form">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Network Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Network-specific error handling with connectivity suggestions
              </Typography>
              <ErrorBoundary fallbackType="network">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Permission Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Permission-specific error handling with access guidance
              </Typography>
              <ErrorBoundary fallbackType="permission">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Data Error Boundary
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Data-specific error handling with corruption recovery
              </Typography>
              <ErrorBoundary fallbackType="data">
                <TestErrorComponentWithBoundary />
              </ErrorBoundary>
            </Paper>
          </Box>
        </Box>
      </Paper>

      {/* Usage Examples */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Usage Examples
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          Here are some examples of how to use the fallback UI system:
        </Typography>

        <Box component="pre" sx={{ 
          bgcolor: 'grey.100', 
          p: 2, 
          borderRadius: 1, 
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
{`// Basic error boundary with default fallback
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// Error boundary with specific fallback type
<ErrorBoundary fallbackType="form">
  <FormComponent />
</ErrorBoundary>

// Error boundary with custom fallback
<ErrorBoundary fallback={<CustomFallback />}>
  <MyComponent />
</ErrorBoundary>

// Error boundary with debug info in development
<ErrorBoundary 
  fallbackType="component"
  showDebugInfo={process.env.NODE_ENV === 'development'}
>
  <MyComponent />
</ErrorBoundary>

// Using pre-configured fallbacks directly
<NetworkErrorFallback />
<FormErrorFallback />
<PermissionErrorFallback />

// Creating custom fallbacks with useFallbackUI hook
const { createFallback } = useFallbackUI();
const customFallback = createFallback({
  type: 'warning',
  title: 'Custom Error',
  message: 'Something specific went wrong',
  suggestions: ['Try this', 'Try that']
});`}
        </Box>
      </Paper>
    </Box>
  );
}
