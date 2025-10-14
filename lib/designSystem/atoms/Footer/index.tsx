'use client';

import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 3,
        borderTop: '1px solid #e0e0e0',
        mt: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} My Company. All rights reserved.
      </Typography>
    </Box>
  );
};
