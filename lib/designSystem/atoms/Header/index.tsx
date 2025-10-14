'use client';

import { LanguageSwitcher } from '@lib/designSystem/';
import { Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <LanguageSwitcher />
    </Box>
  );
};
