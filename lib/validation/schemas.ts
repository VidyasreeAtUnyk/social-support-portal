import * as yup from 'yup';

// Step 1: Personal Information Validation Schema
export const personalInfoSchema = yup.object({
  name: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  nationalId: yup
    .string()
    .transform((value) => (value === '' ? undefined : value))
    .required('National ID is required')
    .matches(/^[A-Za-z0-9]+$/, 'National ID must contain only letters and numbers'),
  dob: yup
    .date()
    .transform((value, originalValue) => {
      // If the original value is empty string, treat it as undefined
      return originalValue === '' ? undefined : value;
    })
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .min(new Date(1900, 0, 1), 'Date of birth must be after 1900'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
  city: yup.string().required('City is required').min(2, 'City must be at least 2 characters'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
});

// Step 2: Family & Financial Information Validation Schema
export const familyInfoSchema = yup.object({
  maritalStatus: yup
    .string()
    .required('Marital status is required')
    .oneOf(['single', 'married', 'divorced', 'widowed'], 'Please select a valid marital status'),
  dependents: yup
    .number()
    .required('Number of dependents is required')
    .min(0, 'Number of dependents cannot be negative')
    .max(20, 'Number of dependents cannot exceed 20')
    .integer('Number of dependents must be a whole number'),
  employmentStatus: yup
    .string()
    .required('Employment status is required')
    .oneOf(
      ['employed', 'unemployed', 'self-employed', 'retired', 'student'],
      'Please select a valid employment status',
    ),
  currency: yup.string().required('Currency is required'),
  monthlyIncome: yup
    .number()
    .required('Monthly income is required')
    .min(0, 'Monthly income cannot be negative')
    .max(1000000, 'Monthly income cannot exceed $1,000,000'),
  housingStatus: yup
    .string()
    .required('Housing status is required')
    .oneOf(
      ['owned', 'rented', 'living-with-family', 'homeless'],
      'Please select a valid housing status',
    ),
});

// Step 3: Situation Descriptions Validation Schema
export const situationDescriptionsSchema = yup.object({
  financialSituation: yup
    .string()
    .required('Financial situation description is required')
    .min(50, 'Please provide at least 50 characters describing your financial situation')
    .max(1000, 'Description must be less than 1000 characters'),
  employmentCircumstances: yup
    .string()
    .min(20, 'Please provide at least 20 characters describing your employment circumstances')
    .max(1000, 'Description must be less than 1000 characters'),
  reasonForApplying: yup
    .string()
    .required('Reason for applying is required')
    .min(50, 'Please provide at least 50 characters explaining why you are applying')
    .max(1000, 'Description must be less than 1000 characters'),
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
