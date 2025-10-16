'use client';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent<string>) => {
    i18n.changeLanguage(e.target.value as string);
  };

  const effectiveValue = i18n.language.includes('en') ? 'en' : i18n.language;

  return (
    <Select value={effectiveValue} onChange={handleChange} size="small" sx={{ minWidth: 100 }}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">Arabic</MenuItem>
    </Select>
  );
};
