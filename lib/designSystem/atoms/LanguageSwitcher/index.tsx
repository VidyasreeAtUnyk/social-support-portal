'use client';

import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Select value={i18n.language} onChange={handleChange} size="small" sx={{ minWidth: 100 }}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">Arabic</MenuItem>
      <MenuItem value="hi">Hindi</MenuItem>
    </Select>
  );
};
