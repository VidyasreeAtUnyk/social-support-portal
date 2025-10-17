'use client';

import { designTokens } from '@lib/designSystem/tokens';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

// Styled components using design tokens
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mode === 'light' 
    ? designTokens.gradients.background.light 
    : designTokens.gradients.background.dark,
  backgroundAttachment: 'fixed',
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: designTokens.typography.fontSize['5xl'],
  fontWeight: designTokens.typography.fontWeight.bold,
  background: designTokens.gradients.primary,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  marginBottom: designTokens.spacing.md,
  [theme.breakpoints.down('sm')]: {
    fontSize: designTokens.typography.fontSize['4xl'],
  },
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  fontSize: designTokens.typography.fontSize['2xl'],
  fontWeight: designTokens.typography.fontWeight.semibold,
  color: theme.palette.text.primary,
  textAlign: 'center',
  marginBottom: designTokens.spacing.sm,
  [theme.breakpoints.down('sm')]: {
    fontSize: designTokens.typography.fontSize.xl,
  },
}));

const ErrorDescription = styled(Typography)(({ theme }) => ({
  fontSize: designTokens.typography.fontSize.md,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  marginBottom: designTokens.spacing.xl,
  maxWidth: '600px',
  lineHeight: designTokens.typography.lineHeight.relaxed,
}));

const ActionStack = styled(Stack)(({ theme }) => ({
  gap: designTokens.spacing.md,
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: designTokens.spacing.sm,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: designTokens.borderRadius.lg,
  padding: `${designTokens.spacing.md} ${designTokens.spacing.xl}`,
  fontSize: designTokens.typography.fontSize.md,
  fontWeight: designTokens.typography.fontWeight.semibold,
  minWidth: '160px',
  boxShadow: designTokens.shadows.md,
  transition: `all ${designTokens.animations.duration.normal} ${designTokens.animations.easing.easeInOut}`,
  '&:hover': {
    boxShadow: designTokens.shadows.lg,
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const IllustrationBox = styled(Box)(({ theme }) => ({
  width: '200px',
  height: '200px',
  borderRadius: designTokens.borderRadius['2xl'],
  background: theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, ${designTokens.colors.primary[50]} 0%, ${designTokens.colors.secondary[50]} 100%)`
    : `linear-gradient(135deg, ${designTokens.colors.primary[900]} 0%, ${designTokens.colors.secondary[900]} 100%)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: designTokens.spacing.xl,
  boxShadow: designTokens.shadows.xl,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `conic-gradient(from 0deg, transparent, ${designTokens.colors.primary[200]}, transparent)`,
    animation: 'rotate 3s linear infinite',
    opacity: 0.1,
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    height: '150px',
  },
}));

const ErrorIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  zIndex: 1,
  position: 'relative',
}));

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <StyledContainer maxWidth="md">
      <Box
        sx={{
          textAlign: 'center',
          padding: designTokens.spacing.xl,
          borderRadius: designTokens.borderRadius.xl,
          background: (theme) => theme.palette.background.paper,
          boxShadow: designTokens.shadows['2xl'],
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <ErrorCode>404</ErrorCode>
        
        <ErrorTitle>
          {t('notFound.title', 'Page Not Found')}
        </ErrorTitle>
        
        <ErrorDescription>
          {t('notFound.description', 'Sorry, we couldn\'t find the page you\'re looking for. It might have been moved, deleted, or you may have entered the wrong URL.')}
        </ErrorDescription>
        
        <ActionStack direction={{ xs: 'column', sm: 'row' }}>
          <StyledButton
            variant="contained"
            onClick={handleGoHome}
            sx={{
              background: designTokens.gradients.primary,
              '&:hover': {
                background: designTokens.gradients.primary,
                boxShadow: designTokens.shadows.xl,
              },
            }}
          >
            {t('notFound.goHome', 'Go Home')}
          </StyledButton>
          
          <StyledButton
            variant="outlined"
            onClick={handleGoBack}
            sx={{
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            {t('notFound.goBack', 'Go Back')}
          </StyledButton>
        </ActionStack>
      </Box>
    </StyledContainer>
  );
}
