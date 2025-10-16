import { DEFAULT_ALLOWED_COUNTRIES, DEFAULT_PHONE_COUNTRY } from '@lib/config/countries';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export interface PhoneValidationResult {
  isValid: boolean;
  formattedNumber?: string;
  countryCode?: string;
  nationalNumber?: string;
  error?: string;
  errorKey?: string; // Translation key for the error
}

export interface PhoneValidationOptions {
  defaultCountry?: string;
  strictMode?: boolean;
  allowNationalFormat?: boolean;
  allowedCountries?: string[];
  getTranslation?: (key: string, options?: Record<string, unknown>) => string;
}

/**
 * Validates and formats a phone number using libphonenumber-js
 * @param phoneNumber - The phone number to validate
 * @param options - Validation options
 * @returns PhoneValidationResult with validation status and formatted data
 */
export function validatePhoneNumber(
  phoneNumber: string,
  options: PhoneValidationOptions = {},
): PhoneValidationResult {
  const {
    defaultCountry = DEFAULT_PHONE_COUNTRY,
    strictMode = true,
    allowNationalFormat = true,
    allowedCountries = DEFAULT_ALLOWED_COUNTRIES,
    getTranslation,
  } = options;

  try {
    // Clean the input - remove spaces, dashes, parentheses
    const cleanedNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');

    // Parse the phone number
    const parsedNumber = parsePhoneNumberFromString(cleanedNumber, defaultCountry as CountryCode);

    if (!parsedNumber) {
      return {
        isValid: false,
        error: getTranslation
          ? getTranslation('phone.errors.invalidFormat')
          : 'phone.errors.invalidFormat',
        errorKey: 'phone.errors.invalidFormat',
      };
    }

    // Check if the number is valid
    const isValid = parsedNumber.isValid();

    if (!isValid) {
      return {
        isValid: false,
        error: getTranslation ? getTranslation('phone.errors.notValid') : 'phone.errors.notValid',
        errorKey: 'phone.errors.notValid',
      };
    }

    // Check if country is allowed
    if (parsedNumber.country && !allowedCountries.includes(parsedNumber.country)) {
      return {
        isValid: false,
        error: getTranslation
          ? getTranslation('phone.errors.countryNotAllowed', { country: parsedNumber.country })
          : 'phone.errors.countryNotAllowed',
        errorKey: 'phone.errors.countryNotAllowed',
      };
    }

    // Additional strict validation
    if (strictMode) {
      // Check if it's a mobile number (optional - can be customized based on requirements)
      const type = parsedNumber.getType();
      if (type === 'FIXED_LINE' && !allowNationalFormat) {
        return {
          isValid: false,
          error: getTranslation
            ? getTranslation('phone.errors.mobileRequired')
            : 'phone.errors.mobileRequired',
          errorKey: 'phone.errors.mobileRequired',
        };
      }
    }

    return {
      isValid: true,
      formattedNumber: parsedNumber.formatInternational(),
      countryCode: parsedNumber.country || undefined,
      nationalNumber: parsedNumber.nationalNumber,
    };
  } catch {
    return {
      isValid: false,
      error: getTranslation
        ? getTranslation('phone.errors.parsingError')
        : 'phone.errors.parsingError',
      errorKey: 'phone.errors.parsingError',
    };
  }
}

/**
 * Formats a phone number for display
 * @param phoneNumber - The phone number to format
 * @param format - The format type ('international', 'national', 'e164')
 * @param defaultCountry - Default country code
 * @returns Formatted phone number string
 */
export function formatPhoneNumber(
  phoneNumber: string,
  format: 'international' | 'national' | 'e164' = 'international',
  defaultCountry: string = DEFAULT_PHONE_COUNTRY,
): string {
  try {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber, defaultCountry as CountryCode);

    if (!parsedNumber || !parsedNumber.isValid()) {
      return phoneNumber; // Return original if invalid
    }

    switch (format) {
      case 'international':
        return parsedNumber.formatInternational();
      case 'national':
        return parsedNumber.formatNational();
      case 'e164':
        return parsedNumber.format('E.164');
      default:
        return parsedNumber.formatInternational();
    }
  } catch (error) {
    return phoneNumber; // Return original if error
  }
}

/**
 * Gets country information from phone number
 * @param phoneNumber - The phone number
 * @returns Country code and name
 */
export function getPhoneNumberCountry(phoneNumber: string): { code?: string; name?: string } {
  try {
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);

    if (!parsedNumber || !parsedNumber.isValid()) {
      return {};
    }

    return {
      code: parsedNumber.country || undefined,
      name: parsedNumber.countryCallingCode,
    };
  } catch (error) {
    return {};
  }
}

/**
 * Validates phone number for specific countries
 * @param phoneNumber - The phone number to validate
 * @param allowedCountries - Array of allowed country codes
 * @returns Validation result
 */
export function validatePhoneNumberForCountries(
  phoneNumber: string,
  allowedCountries: string[] = DEFAULT_ALLOWED_COUNTRIES,
  getTranslation?: (key: string, options?: Record<string, unknown>) => string,
): PhoneValidationResult {
  const result = validatePhoneNumber(phoneNumber, {
    allowedCountries,
    getTranslation,
  });

  if (!result.isValid) {
    return result;
  }

  if (result.countryCode && !allowedCountries.includes(result.countryCode)) {
    return {
      isValid: false,
      error: getTranslation
        ? getTranslation('phone.errors.countryNotAllowed', { country: result.countryCode })
        : 'phone.errors.countryNotAllowed',
      errorKey: 'phone.errors.countryNotAllowed',
    };
  }

  return result;
}

/**
 * Creates a yup validation function for phone numbers
 * @param options - Validation options
 * @returns Yup validation function that returns validation result
 */
export function createPhoneValidation(options: PhoneValidationOptions = {}) {
  return function (
    this: { createError: (options: { message: string; path: string }) => unknown; path: string },
    value: string,
  ) {
    if (!value) return true; // Let required() handle empty values

    const result = validatePhoneNumber(value, options);

    if (!result.isValid) {
      return this.createError({
        message: result.errorKey || 'phone.errors.invalid',
        path: this.path,
      });
    }

    return true;
  };
}

/**
 * Validates phone number and returns detailed result for yup integration
 * @param phoneNumber - The phone number to validate
 * @param options - Validation options
 * @returns PhoneValidationResult with detailed validation information
 */
export function validatePhoneForYup(
  phoneNumber: string,
  options: PhoneValidationOptions = {},
): PhoneValidationResult {
  return validatePhoneNumber(phoneNumber, options);
}
