'use client';

import { Paper, PaperProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const Card = (props: PaperProps) => {
  return <StyledPaper {...props} />;
};
