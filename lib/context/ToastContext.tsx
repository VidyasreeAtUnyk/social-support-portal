// ToastContext.tsx
import { DEFAULT_NAMESPACE } from '@lib/constants';
import { Toast } from '@lib/designSystem';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ToastOptions {
  message?: string;
  translationKey?: string;
  translationParams?: Record<string, unknown>;
  namespace?: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions>({ message: '' });
  const [open, setOpen] = useState(false);
  const { t } = useTranslation([DEFAULT_NAMESPACE]);

  const showToast = (options: ToastOptions) => {
    setToastOptions(options);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Get the final message - either direct message or translated key
  const getMessage = () => {
    if (toastOptions.message) {
      return toastOptions.message;
    }
    if (toastOptions.translationKey) {
      return t(toastOptions.translationKey, { 
        ns: toastOptions.namespace || DEFAULT_NAMESPACE,
        ...toastOptions.translationParams 
      });
    }
    return '';
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={open}
        message={getMessage()}
        severity={toastOptions.severity}
        autoHideDuration={toastOptions.autoHideDuration}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};
