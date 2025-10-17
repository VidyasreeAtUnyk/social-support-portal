'use client';

import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';

export interface CustomTypographyProps extends TypographyProps {
  /**
   * Typography variant
   * @default 'body1'
   */
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'button';
  /**
   * Text color
   * @default 'inherit'
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'inherit';
  /**
   * Text alignment
   * @default 'inherit'
   */
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  /**
   * Whether text should be truncated with ellipsis
   * @default false
   */
  noWrap?: boolean;
  /**
   * Whether text should be bold
   * @default false
   */
  bold?: boolean;
  /**
   * Whether text should be italic
   * @default false
   */
  italic?: boolean;
  /**
   * Whether text should be underlined
   * @default false
   */
  underline?: boolean;
}

interface StyledTypographyProps {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

const StyledTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) => !['bold', 'italic', 'underline'].includes(prop as string),
})<StyledTypographyProps>(({ theme, bold, italic, underline }) => ({
  ...(bold && {
    fontWeight: 700,
  }),
  ...(italic && {
    fontStyle: 'italic',
  }),
  ...(underline && {
    textDecoration: 'underline',
  }),
  transition: 'color 0.2s ease-in-out',
}));

/**
 * Typography component with consistent styling and semantic variants
 *
 * @example
 * ```tsx
 * <Typography variant="h1" color="primary">
 *   Main Heading
 * </Typography>
 *
 * <Typography variant="body1" bold>
 *   Bold body text
 * </Typography>
 *
 * <Typography variant="caption" color="textSecondary">
 *   Small caption text
 * </Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, CustomTypographyProps>(
  ({ variant = 'body1', bold = false, italic = false, underline = false, ...props }, ref) => {
    return (
      <StyledTypography
        ref={ref}
        variant={variant}
        bold={bold}
        italic={italic}
        underline={underline}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
