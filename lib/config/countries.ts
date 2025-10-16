export interface CountryConfig {
  code: string;
  name: string;
  phoneCode: string;
  flag: string;
  nameKey: string; // Translation key for the name
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'AE',
    name: 'United Arab Emirates',
    phoneCode: '+971',
    flag: '🇦🇪',
    nameKey: 'countries.uae',
  },
  {
    code: 'IN',
    name: 'India',
    phoneCode: '+91',
    flag: '🇮🇳',
    nameKey: 'countries.india',
  },
  {
    code: 'US',
    name: 'United States',
    phoneCode: '+1',
    flag: '🇺🇸',
    nameKey: 'countries.usa',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    phoneCode: '+44',
    flag: '🇬🇧',
    nameKey: 'countries.uk',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    phoneCode: '+966',
    flag: '🇸🇦',
    nameKey: 'countries.saudi',
  },
  {
    code: 'KW',
    name: 'Kuwait',
    phoneCode: '+965',
    flag: '🇰🇼',
    nameKey: 'countries.kuwait',
  },
  {
    code: 'QA',
    name: 'Qatar',
    phoneCode: '+974',
    flag: '🇶🇦',
    nameKey: 'countries.qatar',
  },
  {
    code: 'BH',
    name: 'Bahrain',
    phoneCode: '+973',
    flag: '🇧🇭',
    nameKey: 'countries.bahrain',
  },
  {
    code: 'OM',
    name: 'Oman',
    phoneCode: '+968',
    flag: '🇴🇲',
    nameKey: 'countries.oman',
  },
  {
    code: 'JO',
    name: 'Jordan',
    phoneCode: '+962',
    flag: '🇯🇴',
    nameKey: 'countries.jordan',
  },
  {
    code: 'LB',
    name: 'Lebanon',
    phoneCode: '+961',
    flag: '🇱🇧',
    nameKey: 'countries.lebanon',
  },
  {
    code: 'EG',
    name: 'Egypt',
    phoneCode: '+20',
    flag: '🇪🇬',
    nameKey: 'countries.egypt',
  },
];

// Default allowed countries for phone validation
export const DEFAULT_ALLOWED_COUNTRIES = ['AE', 'IN', 'US', 'GB', 'SA', 'KW', 'QA', 'BH', 'OM'];

// Default country for phone validation
export const DEFAULT_PHONE_COUNTRY = 'AE';

// Get countries by codes
export function getCountriesByCodes(codes: string[]): CountryConfig[] {
  return COUNTRIES.filter((country) => codes.includes(country.code));
}

// Get country by code
export function getCountryByCode(code: string): CountryConfig | undefined {
  return COUNTRIES.find((country) => country.code === code);
}
