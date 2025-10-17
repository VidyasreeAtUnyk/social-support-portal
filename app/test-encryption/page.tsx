'use client';

import { Alert, Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useState } from 'react';

export default function EncryptionTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, message]);
  };

  const runEncryptionTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Import the test functions
      const { testEncryption } = await import('@lib/security/encryption.test');
      
      // Capture console.log output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      const logs: string[] = [];
      
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };
      
      console.error = (...args) => {
        logs.push(`❌ ${args.join(' ')}`);
        originalError(...args);
      };
      
      console.warn = (...args) => {
        logs.push(`⚠️ ${args.join(' ')}`);
        originalWarn(...args);
      };

      await testEncryption();
      setTestResults(logs);
      
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runDecryptionTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    try {
      // Import the test functions
      const { testDecryption } = await import('@lib/security/encryption.test');
      
      // Capture console.log output
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      
      const logs: string[] = [];
      
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };
      
      console.error = (...args) => {
        logs.push(`❌ ${args.join(' ')}`);
        originalError(...args);
      };
      
      console.warn = (...args) => {
        logs.push(`⚠️ ${args.join(' ')}`);
        originalWarn(...args);
      };

      await testDecryption();
      setTestResults(logs);
      
      // Restore original console methods
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
      
    } catch (error) {
      addResult(`❌ Test failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        🔐 Encryption Browser Tests
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This page runs the browser console encryption tests with real Web Crypto API.
        These tests verify actual encryption/decryption functionality.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardHeader title="Test Controls" />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button 
              variant="contained" 
              onClick={runEncryptionTest}
              disabled={isRunning}
            >
              🔒 Test Encryption
            </Button>
            <Button 
              variant="contained" 
              onClick={runDecryptionTest}
              disabled={isRunning}
            >
              🔓 Test Decryption
            </Button>
            <Button 
              variant="outlined" 
              onClick={clearResults}
              disabled={isRunning}
            >
              Clear Results
            </Button>
          </Box>
          
          {isRunning && (
            <Alert severity="info">
              Running test... Check the browser console for detailed output.
            </Alert>
          )}
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader title="Test Results" />
          <CardContent>
            <Box 
              sx={{ 
                backgroundColor: '#f5f5f5', 
                padding: 2, 
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                maxHeight: 400,
                overflow: 'auto'
              }}
            >
              {testResults.map((result, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                  {result}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      <Card sx={{ mt: 3 }}>
        <CardHeader title="How to Use" />
        <CardContent>
          <Typography variant="body1" paragraph>
            <strong>Method 1:</strong> Use the buttons above to run tests in the UI
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Method 2:</strong> Open browser console (F12) and run:
          </Typography>
          <Box 
            sx={{ 
              backgroundColor: '#f5f5f5', 
              padding: 2, 
              borderRadius: 1,
              fontFamily: 'monospace',
              fontSize: '0.875rem'
            }}
          >
            testEncryption()<br />
            testDecryption()
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Method 3:</strong> Submit the actual form and check console logs for encryption status
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
