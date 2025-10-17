'use client';

import { useFormEncryption } from '@lib/hooks/useFormEncryption';
import { Security as SecurityIcon } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SecurityNoticeProps {
  variant?: 'full' | 'compact';
  showIcon?: boolean;
}

/**
 * Security Notice Component
 * 
 * Displays privacy and security information to users
 * Shows actual encryption status
 * 
 * @example
 * ```tsx
 * <SecurityNotice variant="full" />
 * <SecurityNotice variant="compact" showIcon={true} />
 * ```
 */
export const SecurityNotice: React.FC<SecurityNoticeProps> = ({
  variant = 'compact',
  showIcon = true,
}) => {
  const { t } = useTranslation(['common']);
  const { isSupported, isLoading, hasEncryptionKey } = useFormEncryption();

  if (variant === 'compact') {
    return (
      <Alert 
        severity={isSupported && hasEncryptionKey ? "success" : "warning"}
        icon={showIcon ? <SecurityIcon /> : undefined}
        sx={{ mb: 2 }}
      >
        <Typography variant="body2">
          {isLoading ? t('common:security.secureForm') : 
           isSupported && hasEncryptionKey ? 
           t('common:security.encryptedForm') :
           t('common:security.httpsOnly')}
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Alert 
        severity={isSupported && hasEncryptionKey ? "success" : "info"} 
        icon={showIcon ? <SecurityIcon /> : undefined}
      >
        <AlertTitle>
          {isSupported && hasEncryptionKey ? 
           t('common:security.encryptedTitle') : 
           t('common:security.dataEncryption')}
        </AlertTitle>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {isLoading ? t('common:security.dataRetention') :
           isSupported && hasEncryptionKey ?
           t('common:security.encryptedDescription') :
           t('common:security.httpsDescription')}
        </Typography>
        <Typography variant="body2">
          {t('common:security.privacyPolicy')}
        </Typography>
      </Alert>
    </Box>
  );
};

export default SecurityNotice;
