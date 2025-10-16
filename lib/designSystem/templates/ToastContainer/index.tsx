'use client';

import { Toast } from '@lib/designSystem/atoms/Toast';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createContext, forwardRef, ReactNode, useCallback, useContext, useState } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  dismissible?: boolean;
}

export interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const StyledToastContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.snackbar,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  maxWidth: 400,
  pointerEvents: 'none',
  '& > *': {
    pointerEvents: 'auto',
  },
}));

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      id,
      duration: 6000,
      dismissible: true,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, clearAllToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer = () => {
  const { hideToast } = useToast();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  return (
    <StyledToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          open={true}
          message={toast.message}
          severity={toast.severity}
          autoHideDuration={toast.duration}
          dismissible={toast.dismissible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </StyledToastContainer>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export interface ToastContainerProps extends BoxProps {
  /**
   * Toast messages to display
   */
  toasts?: ToastMessage[];
  /**
   * Callback when toast is closed
   */
  onToastClose?: (id: string) => void;
  /**
   * Toast container position
   * @default 'top-right'
   */
  toastPosition?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /**
   * Maximum number of toasts to show
   * @default 5
   */
  maxToasts?: number;
}

const PositionedToastContainer = styled(Box)<ToastContainerProps>(
  ({ theme, toastPosition = 'top-right' }) => ({
    position: 'fixed',
    zIndex: theme.zIndex.snackbar,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    maxWidth: 400,
    pointerEvents: 'none',
    '& > *': {
      pointerEvents: 'auto',
    },
    ...(toastPosition === 'top-left' && {
      top: theme.spacing(2),
      left: theme.spacing(2),
    }),
    ...(toastPosition === 'top-center' && {
      top: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(toastPosition === 'top-right' && {
      top: theme.spacing(2),
      right: theme.spacing(2),
    }),
    ...(toastPosition === 'bottom-left' && {
      bottom: theme.spacing(2),
      left: theme.spacing(2),
    }),
    ...(toastPosition === 'bottom-center' && {
      bottom: theme.spacing(2),
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(toastPosition === 'bottom-right' && {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }),
  }),
);

/**
 * ToastContainer component for managing multiple toast notifications
 *
 * @example
 * ```tsx
 * <ToastContainerComponent
 *   toasts={toastMessages}
 *   onToastClose={handleToastClose}
 *   position="top-right"
 *   maxToasts={3}
 * />
 *
 * // With provider
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastContainerComponent = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ toasts = [], onToastClose, toastPosition = 'top-right', maxToasts = 5, ...props }, ref) => {
    const visibleToasts = toasts.slice(0, maxToasts);

    return (
      <PositionedToastContainer ref={ref} toastPosition={toastPosition} {...props}>
        {visibleToasts.map((toast) => (
          <Toast
            key={toast.id}
            open={true}
            message={toast.message}
            severity={toast.severity}
            autoHideDuration={toast.duration}
            dismissible={toast.dismissible}
            onClose={() => onToastClose?.(toast.id)}
          />
        ))}
      </PositionedToastContainer>
    );
  },
);

ToastContainerComponent.displayName = 'ToastContainerComponent';

export { ToastProvider };
