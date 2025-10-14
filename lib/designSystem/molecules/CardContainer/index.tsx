'use client';

import { Typography } from '@lib/designSystem/atoms/Typography';
import { Box, Card, CardActions, CardContent, CardHeader, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, forwardRef } from 'react';

export interface CardContainerProps extends CardProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card subtitle
   */
  subtitle?: string;
  /**
   * Card description
   */
  description?: string;
  /**
   * Card content
   */
  children: ReactNode;
  /**
   * Card actions/footer content
   */
  actions?: ReactNode;
  /**
   * Card variant
   * @default 'elevation'
   */
  variant?: 'elevation' | 'outlined' | 'filled';
  /**
   * Card elevation level
   * @default 1
   */
  elevation?: number;
  /**
   * Whether card is clickable
   * @default false
   */
  clickable?: boolean;
  /**
   * Whether card is selected
   * @default false
   */
  selected?: boolean;
  /**
   * Card size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Card header icon
   */
  icon?: ReactNode;
}

const StyledCard = styled(Card)<CardContainerProps>(
  ({ theme, clickable, selected, size = 'medium' }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'all 0.2s ease-in-out',
    ...(size === 'small' && {
      padding: theme.spacing(1),
    }),
    ...(size === 'medium' && {
      padding: theme.spacing(2),
    }),
    ...(size === 'large' && {
      padding: theme.spacing(3),
    }),
    ...(clickable && {
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[8],
      },
    }),
    ...(selected && {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}20`,
    }),
  }),
);

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  '& .MuiCardHeader-content': {
    overflow: 'hidden',
  },
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
}));

const StyledCardContent = styled(CardContent)<CardContainerProps>(({ theme, size = 'medium' }) => ({
  paddingTop: theme.spacing(1),
  ...(size === 'small' && {
    padding: theme.spacing(1),
  }),
  ...(size === 'medium' && {
    padding: theme.spacing(2),
  }),
  ...(size === 'large' && {
    padding: theme.spacing(3),
  }),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1),
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(2),
}));

/**
 * CardContainer component for consistent card layout
 *
 * @example
 * ```tsx
 * <CardContainer
 *   title="Personal Information"
 *   subtitle="Step 1 of 3"
 *   description="Please provide your basic details"
 *   icon={<PersonIcon />}
 * >
 *   <Input label="Name" />
 *   <Input label="Email" />
 * </CardContainer>
 *
 * <CardContainer
 *   title="Select Plan"
 *   clickable
 *   selected={selectedPlan === 'premium'}
 *   onClick={() => setSelectedPlan('premium')}
 * >
 *   <Typography>Premium Plan Details</Typography>
 * </CardContainer>
 * ```
 */
export const CardContainer = forwardRef<HTMLDivElement, CardContainerProps>(
  (
    {
      title,
      subtitle,
      description,
      children,
      actions,
      variant = 'elevation',
      elevation = 1,
      clickable = false,
      selected = false,
      size = 'medium',
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledCard
        ref={ref}
        variant={variant}
        elevation={elevation}
        clickable={clickable}
        selected={selected}
        size={size}
        {...props}
      >
        {(title || subtitle || description || icon) && (
          <StyledCardHeader
            title={title}
            subheader={subtitle}
            avatar={icon ? <IconContainer>{icon}</IconContainer> : undefined}
            action={
              description ? (
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
              ) : undefined
            }
          />
        )}

        <StyledCardContent size={size}>{children}</StyledCardContent>

        {actions && <StyledCardActions>{actions}</StyledCardActions>}
      </StyledCard>
    );
  },
);

CardContainer.displayName = 'CardContainer';
