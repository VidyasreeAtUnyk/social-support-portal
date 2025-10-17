'use client';

import { LANGUAGES, LANGUAGE_DISPLAY_NAMES, getEffectiveLanguage } from '@lib/constants';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent<string>) => {
    i18n.changeLanguage(e.target.value as string);
  };

  const effectiveValue = getEffectiveLanguage(i18n.language);

  return (
    <Select value={effectiveValue} onChange={handleChange} size="small" sx={{ minWidth: 100 }}>
      <MenuItem value={LANGUAGES.ENGLISH}>{LANGUAGE_DISPLAY_NAMES[LANGUAGES.ENGLISH]}</MenuItem>
      <MenuItem value={LANGUAGES.ARABIC}>{LANGUAGE_DISPLAY_NAMES[LANGUAGES.ARABIC]}</MenuItem>
    </Select>
  );
};
