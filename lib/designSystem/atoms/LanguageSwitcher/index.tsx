'use client';

import { MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  const effectiveValue = i18n.language.includes('en') ? 'en' : i18n.language;

  return (
    <Select value={effectiveValue} onChange={handleChange} size="small" sx={{ minWidth: 100 }}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ar">Arabic</MenuItem>
    </Select>
  );
};
