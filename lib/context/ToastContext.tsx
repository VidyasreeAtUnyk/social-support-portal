// ToastContext.tsx
import { Toast } from '@lib/designSystem';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ToastOptions {
  message: string;
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

  const showToast = (options: ToastOptions) => {
    setToastOptions(options);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={open}
        message={toastOptions.message}
        severity={toastOptions.severity}
        autoHideDuration={toastOptions.autoHideDuration}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
};
