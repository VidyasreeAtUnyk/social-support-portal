'use client';

import { HelpOutline as HelpIcon } from '@mui/icons-material';
import { IconButton, Tooltip, TooltipProps, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface HelpTooltipProps extends Omit<TooltipProps, 'title' | 'children'> {
  /**
   * Translation key for the tooltip content
   */
  translationKey: string;
  /**
   * Translation namespace
   * @default 'common'
   */
  namespace?: string;
  /**
   * Translation parameters
   */
  translationParams?: Record<string, unknown>;
  /**
   * Tooltip placement
   * @default 'top'
   */
  placement?: TooltipProps['placement'];
  /**
   * Icon size
   * @default 'small'
   */
  iconSize?: 'small' | 'medium';
  /**
   * Icon color
   * @default 'text.secondary'
   */
  iconColor?: string;
  /**
   * Whether to show the tooltip icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Custom icon component
   */
  icon?: React.ReactNode;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  marginLeft: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
    maxWidth: 300,
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  '& .MuiTooltip-arrow': {
    color: theme.palette.grey[800],
  },
}));

/**
 * HelpTooltip component for displaying contextual help information
 * 
 * @example
 * ```tsx
 * <HelpTooltip 
 *   translationKey="help.selectCountryFirst"
 *   namespace="common"
 * />
 * 
 * <HelpTooltip 
 *   translationKey="help.fieldRequired"
 *   translationParams={{ field: 'email' }}
 *   placement="right"
 * />
 * ```
 */
export const HelpTooltip = forwardRef<HTMLDivElement, HelpTooltipProps>(
  (
    {
      translationKey,
      namespace = 'common',
      translationParams,
      placement = 'top',
      iconSize = 'small',
      iconColor,
      showIcon = true,
      icon,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation([namespace]);

    const tooltipContent = t(translationKey, { 
      ns: namespace, 
      ...translationParams 
    });

    if (!showIcon) {
      return (
        <StyledTooltip
          ref={ref}
          title={tooltipContent}
          placement={placement}
          arrow
          {...props}
        >
          <span>{props.children}</span>
        </StyledTooltip>
      );
    }

    return (
      <StyledTooltip
        ref={ref}
        title={tooltipContent}
        placement={placement}
        arrow
        {...props}
      >
        <StyledIconButton size={iconSize} sx={{ color: iconColor }}>
          {icon || <HelpIcon fontSize={iconSize} />}
        </StyledIconButton>
      </StyledTooltip>
    );
  },
);

HelpTooltip.displayName = 'HelpTooltip';
