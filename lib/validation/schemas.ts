import * as yup from 'yup';

// Step 1: Personal Information Validation Schema
export const personalInfoSchema = yup.object({
  name: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('errors.name.required')
    .min(2, 'errors.name.min')
    .max(100, 'errors.name.max'),

  nationalId: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('errors.nationalId.required')
    .matches(/^[A-Za-z0-9]+$/, 'errors.nationalId.alphaneumeric'),

  dob: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('errors.dob.required')
    .test('is-valid-date', 'errors.dob.invalid', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime()) && date <= new Date() && date >= new Date(1900, 0, 1);
    }),

  gender: yup
    .string()
    .required('errors.gender.required')
    .oneOf(['male', 'female', 'other'], 'errors.gender.invalid'),

  address: yup.string().required('errors.address.required').min(10, 'errors.address.min'),

  city: yup.string().required('errors.city.required').min(2, 'errors.city.min'),

  state: yup.string().required('errors.state.required'),

  country: yup.string().required('errors.country.required'),

  phone: yup
    .string()
    .required('errors.phone.required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'errors.phone.pattern'),

  email: yup.string().required('errors.email.required').email('errors.email.invalid'),
});

// Step 2: Family & Financial Information Validation Schema
export const familyInfoSchema = yup.object({
  maritalStatus: yup
    .string()
    .required('errors.maritalStatus.required')
    .oneOf(['single', 'married', 'divorced', 'widowed'], 'errors.maritalStatus.invalid'),

  dependents: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('errors.dependents.required')
    .min(0, 'errors.dependents.min')
    .max(20, 'errors.dependents.max')
    .integer('errors.dependents.integer'),

  employmentStatus: yup
    .string()
    .required('errors.employmentStatus.required')
    .oneOf(
      ['employed', 'unemployed', 'self-employed', 'retired', 'student'],
      'errors.employmentStatus.invalid',
    ),

  currency: yup.string().required('errors.currency.required'),

  monthlyIncome: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('errors.monthlyIncome.required')
    .min(0, 'errors.monthlyIncome.min')
    .max(1000000, 'errors.monthlyIncome.max'),

  housingStatus: yup
    .string()
    .required('errors.housingStatus.required')
    .oneOf(['owned', 'rented', 'living-with-family', 'homeless'], 'errors.housingStatus.invalid'),
});

// Step 3: Situation Descriptions Validation Schema
export const situationDescriptionsSchema = yup.object({
  financialSituation: yup
    .string()
    .required('errors.financialSituation.required')
    .min(50, 'errors.financialSituation.min')
    .max(1000, 'errors.financialSituation.max'),

  employmentCircumstances: yup
    .string()
    .min(20, 'errors.employmentCircumstances.min')
    .max(1000, 'errors.employmentCircumstances.max'),

  reasonForApplying: yup
    .string()
    .required('errors.reasonForApplying.required')
    .min(50, 'errors.reasonForApplying.min')
    .max(1000, 'errors.reasonForApplying.max'),
});

// Combined form schema for final validation
export const completeFormSchema = yup.object({
  personalInfo: personalInfoSchema,
  familyInfo: familyInfoSchema,
  situationDescriptions: situationDescriptionsSchema,
});

// Type definitions based on schemas
export type PersonalInfoFormData = yup.InferType<typeof personalInfoSchema>;
export type FamilyInfoFormData = yup.InferType<typeof familyInfoSchema>;
export type SituationDescriptionsFormData = yup.InferType<typeof situationDescriptionsSchema>;
export type CompleteFormData = yup.InferType<typeof completeFormSchema>;
