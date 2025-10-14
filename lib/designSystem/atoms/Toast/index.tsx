'use client';

import {
  Alert,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, useEffect, useState } from 'react';

export interface CustomToastProps extends Omit<SnackbarProps, 'children'> {
  /**
   * Toast message
   */
  message: string;
  /**
   * Toast severity/type
   * @default 'info'
   */
  severity?: 'success' | 'error' | 'warning' | 'info';
  /**
   * Whether toast is visible
   * @default false
   */
  open?: boolean;
  /**
   * Auto hide duration in milliseconds
   * @default 6000
   */
  autoHideDuration?: number;
  /**
   * Toast position
   * @default { vertical: 'bottom', horizontal: 'right' }
   */
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  /**
   * Whether toast can be dismissed
   * @default true
   */
  dismissible?: boolean;
  /**
   * Callback when toast is closed
   */
  onClose?: () => void;
}

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  '& .MuiSnackbarContent-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  '& .MuiAlert-message': {
    fontWeight: 500,
  },
}));

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

/**
 * Toast component for displaying notifications
 * 
 * @example
 * ```tsx
 * <Toast
 *   open={showToast}
 *   message="Operation completed successfully!"
 *   severity="success"
 *   onClose={() => setShowToast(false)}
 * />
 * 
 * <Toast
 *   open={showError}
 *   message="Something went wrong"
 *   severity="error"
 *   autoHideDuration={8000}
 * />
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, CustomToastProps>(
  ({ 
    message,
    severity = 'info',
    open = false,
    autoHideDuration = 6000,
    anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
    dismissible = true,
    onClose,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    const handleClose = () => {
      setIsOpen(false);
      onClose?.();
    };

    return (
      <StyledSnackbar
        ref={ref}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        TransitionComponent={SlideTransition}
        {...props}
      >
        <StyledAlert
          onClose={dismissible ? handleClose : undefined}
          severity={severity}
          variant="filled"
        >
          {message}
        </StyledAlert>
      </StyledSnackbar>
    );
  }
);

Toast.displayName = 'Toast';
