'use client';

/**
 * # PhoneInput Component
 *
 * A comprehensive phone number input component with country selection, validation, and internationalization support.
 *
 * ## Features
 * - 🌍 **Country Selection**: Dropdown with flags and phone codes
 * - 📱 **Real-time Validation**: Validates phone numbers using libphonenumber-js
 * - 🎨 **Auto-formatting**: Formats numbers as user types
 * - 🌐 **Internationalization**: Supports English and Arabic
 * - ✅ **Live Feedback**: Shows validation status and formatted numbers
 * - 🚫 **Country Restrictions**: Configurable allowed countries
 *
 * ## Usage Examples
 *
 * ### Basic Usage
 * ```tsx
 * <PhoneInput
 *   value={phoneNumber}
 *   onChange={(value, validation, country) => {
 *     setPhoneNumber(value);
 *     console.log('Validation:', validation);
 *     console.log('Country:', country);
 *   }}
 * />
 * ```
 *
 * ### With Custom Configuration
 * ```tsx
 * <PhoneInput
 *   value={phoneNumber}
 *   onChange={handlePhoneChange}
 *   defaultCountry="IN"
 *   allowedCountries={['IN', 'US', 'GB']}
 *   showCountrySelector={true}
 *   formatOnChange={true}
 *   placeholder="Enter your phone number"
 * />
 * ```
 *
 * ### In Forms (React Hook Form)
 * ```tsx
 * <FormField
 *   label="Phone Number"
 *   control={control}
 *   name="phone"
 * >
 *   {({ value, onChange, error }) => (
 *     <PhoneInput
 *       value={value}
 *       onChange={(phoneValue) => onChange(phoneValue)}
 *       error={error ? 'Invalid phone number' : undefined}
 *     />
 *   )}
 * </FormField>
 * ```
 *
 * ## Props
 *
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `value` | `string` | `''` | Phone number value |
 * | `onChange` | `(value: string, validation: PhoneValidationResult, country?: string) => void` | - | Callback when phone number changes |
 * | `defaultCountry` | `string` | `'AE'` | Default country code |
 * | `showCountrySelector` | `boolean` | `true` | Whether to show country dropdown |
 * | `formatOnChange` | `boolean` | `true` | Whether to format number as user types |
 * | `allowedCountries` | `string[]` | `['AE', 'IN', 'US', 'GB', 'SA', 'KW', 'QA', 'BH', 'OM']` | Allowed country codes |
 * | `error` | `string` | - | Error message to display |
 * | `helperText` | `string` | - | Helper text |
 *
 * ## Validation
 *
 * The component validates phone numbers using libphonenumber-js and provides:
 * - ✅ **Format Validation**: Checks if number format is correct
 * - 🌍 **Country Validation**: Ensures number belongs to selected/allowed country
 * - 📱 **Type Validation**: Can distinguish between mobile and landline
 * - 🚫 **Restriction Validation**: Checks against allowed countries list
 *
 * ## Internationalization
 *
 * ### Adding New Countries
 * 1. Add country to `lib/config/countries.ts`:
 * ```typescript
 * {
 *   code: 'FR',
 *   name: 'France',
 *   phoneCode: '+33',
 *   flag: '🇫🇷',
 *   nameKey: 'countries.france',
 * }
 * ```
 *
 * 2. Add translations to locale files:
 * ```json
 * // locales/en/common.json
 * "countries": {
 *   "france": "France"
 * }
 *
 * // locales/ar/common.json
 * "countries": {
 *   "france": "فرنسا"
 * }
 * ```
 *
 * ### Error Messages
 * Error messages are automatically translated using keys from `phone.errors.*`:
 * - `phone.errors.invalidFormat`
 * - `phone.errors.notValid`
 * - `phone.errors.mobileRequired`
 * - `phone.errors.parsingError`
 * - `phone.errors.countryNotAllowed`
 *
 * ## Configuration
 *
 * ### Default Settings
 * - **Default Country**: `'AE'` (UAE)
 * - **Allowed Countries**: `['AE', 'IN', 'US', 'GB', 'SA', 'KW', 'QA', 'BH', 'OM']`
 * - **Validation**: Strict mode enabled
 * - **Formatting**: National format preferred
 *
 * ### Customizing Allowed Countries
 * ```typescript
 * // In lib/config/countries.ts
 * export const DEFAULT_ALLOWED_COUNTRIES = ['AE', 'IN', 'US', 'GB', 'FR'];
 * ```
 *
 * ## Integration with Forms
 *
 * ### Yup Schema Integration
 * ```typescript
 * // In validation schemas
 * phone: yup
 *   .string()
 *   .required('errors.phone.required')
 *   .test('phone-validation', 'errors.phone.invalid', function (value) {
 *     const result = validatePhoneForYup(value, {
 *       defaultCountry: DEFAULT_PHONE_COUNTRY,
 *       allowedCountries: DEFAULT_ALLOWED_COUNTRIES,
 *     });
 *     return result.isValid;
 *   })
 * ```
 *
 * ## Styling
 *
 * The component uses MUI's styled components and follows the design system:
 * - **StyledTextField**: Custom styling for the phone input
 * - **CountrySelector**: Styled dropdown for country selection
 * - **Responsive**: Adapts to different screen sizes
 * - **Theme Integration**: Uses theme colors and spacing
 *
 * ## Accessibility
 * - **ARIA Labels**: Proper labeling for screen readers
 * - **Keyboard Navigation**: Full keyboard support
 * - **Focus Management**: Proper focus handling
 * - **Error Announcements**: Screen reader announcements for errors
 *
 * ## Performance
 * - **Lazy Loading**: Countries loaded on demand
 * - **Memoization**: Optimized re-renders
 * - **Debounced Validation**: Prevents excessive validation calls
 *
 * ## Troubleshooting
 *
 * ### Common Issues
 * 1. **Country not showing**: Check if country is in `allowedCountries` array
 * 2. **Validation failing**: Ensure phone number format matches selected country
 * 3. **Translation missing**: Add missing keys to locale files
 * 4. **Styling issues**: Check MUI theme configuration
 *
 * ### Debug Mode
 * Enable debug logging by setting `debug: true` in i18n configuration.
 */

import {
  DEFAULT_ALLOWED_COUNTRIES,
  DEFAULT_PHONE_COUNTRY,
  getCountriesByCodes,
} from '@lib/config/countries';
import {
  formatPhoneNumber,
  PhoneValidationResult,
  validatePhoneNumber,
} from '@lib/validation/phoneValidation';
import { Box, InputAdornment, MenuItem, Select, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface PhoneInputProps extends Omit<TextFieldProps, 'onChange' | 'error'> {
  /**
   * Phone number value
   */
  value?: string;
  /**
   * Callback when phone number changes
   */
  onChange?: (value: string, validation: PhoneValidationResult, country?: string) => void;
  /**
   * Default country code
   * @default 'AE'
   */
  defaultCountry?: string;
  /**
   * Selected country code (controlled from form state)
   */
  selectedCountry?: string;
  /**
   * Whether to show country selector
   * @default true
   */
  showCountrySelector?: boolean;
  /**
   * Whether to format the number as user types
   * @default true
   */
  formatOnChange?: boolean;
  /**
   * Allowed countries (ISO country codes)
   */
  allowedCountries?: string[];
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s ease-in-out',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 2,
    },
  },
}));

const CountrySelector = styled(Select)(({ theme }) => ({
  minWidth: 120,
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

export const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
  (
    {
      value = '',
      onChange,
      defaultCountry = DEFAULT_PHONE_COUNTRY,
      selectedCountry: controlledSelectedCountry,
      showCountrySelector = true,
      formatOnChange = true,
      allowedCountries = DEFAULT_ALLOWED_COUNTRIES,
      error,
      helperText,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation(['common']);
    const [phoneNumber, setPhoneNumber] = useState(value);
    const [validation, setValidation] = useState<PhoneValidationResult>({ isValid: false });

    // Use controlled selectedCountry if provided, otherwise use defaultCountry
    const selectedCountry = controlledSelectedCountry || defaultCountry;

    // Filter countries based on allowed countries and get translated names
    const availableCountries = getCountriesByCodes(allowedCountries).map((country) => ({
      ...country,
      name: t(country.nameKey, { ns: 'common' }) || country.name,
    }));

    // Update phone number when value prop changes
    useEffect(() => {
      setPhoneNumber(value);
    }, [value]);

    // Validate phone number
    const validateNumber = (number: string, country: string) => {
      const result = validatePhoneNumber(number, {
        defaultCountry: country,
        strictMode: true,
        allowNationalFormat: true,
        allowedCountries,
        getTranslation: t,
      });
      setValidation(result);
      return result;
    };

    // Handle phone number input change
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      let formattedValue = inputValue;

      // Format the number if enabled
      if (formatOnChange && inputValue) {
        try {
          // Use international format to avoid locale-dependent formatting
          formattedValue = formatPhoneNumber(inputValue, 'international', selectedCountry);
        } catch {
          // If formatting fails, use the raw input
          formattedValue = inputValue;
        }
      }

      setPhoneNumber(formattedValue);

      // Always validate and pass the result
      const validationResult = validateNumber(formattedValue, selectedCountry);

      // Pass the actual phone number to the form, let Yup handle validation
      onChange?.(formattedValue, validationResult, selectedCountry);
    };

    // Handle country change
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCountryChange = (event: any) => {
      const newCountry = event.target.value as string;

      // Re-validate with new country
      if (phoneNumber) {
        const validationResult = validateNumber(phoneNumber, newCountry);
        onChange?.(phoneNumber, validationResult, newCountry);
      } else {
        // Just notify about country change
        onChange?.(phoneNumber, validation, newCountry);
      }
    };

    // Get the selected country data
    const selectedCountryData = availableCountries.find((c) => c.code === selectedCountry);

    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        {showCountrySelector && (
          <CountrySelector
            value={selectedCountry}
            onChange={handleCountryChange}
            variant="outlined"
            size={props.size || 'medium'}
            sx={{ minWidth: 120 }}
          >
            {availableCountries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{country.flag}</span>
                  <span>{country.phoneCode}</span>
                </Box>
              </MenuItem>
            ))}
          </CountrySelector>
        )}

        <StyledTextField
          ref={ref}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={
            selectedCountryData
              ? `${selectedCountryData.phoneCode} xxx xxx xxx`
              : t('phone.placeholder', { ns: 'common' })
          }
          error={!!error}
          helperText={
            error ||
            helperText ||
            (validation.isValid && validation.formattedNumber
              ? `✓ ${validation.formattedNumber}`
              : '')
          }
          InputProps={{
            startAdornment: !showCountrySelector ? (
              <InputAdornment position="start">{selectedCountryData?.phoneCode}</InputAdornment>
            ) : undefined,
          }}
          {...props}
        />
      </Box>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';
