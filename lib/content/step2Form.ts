export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  label: string;
  name: string;
  type: 'text' | 'select' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  dependsOn?: string;
  dynamicOptions?: 'currencies';
}

export const currencies = [
  { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
];

// Step 2 Form Fields
export const familyInfoForm: FieldConfig[] = [
  {
    label: 'fields.maritalStatus',
    name: 'familyInfo.maritalStatus',
    type: 'select',
    required: true,
    options: [
      { value: 'single', label: 'options.single' },
      { value: 'married', label: 'options.married' },
      { value: 'divorced', label: 'options.divorced' },
      { value: 'widowed', label: 'options.widowed' },
    ],
  },
  {
    label: 'fields.dependents',
    name: 'familyInfo.dependents',
    type: 'number',
    required: true,
    placeholder: '0',
  },
  {
    label: 'fields.employmentStatus',
    name: 'familyInfo.employmentStatus',
    type: 'select',
    required: true,
    options: [
      { value: 'employed', label: 'options.employed' },
      { value: 'self-employed', label: 'options.selfEmployed' },
      { value: 'unemployed', label: 'options.unemployed' },
      { value: 'student', label: 'options.student' },
      { value: 'retired', label: 'options.retired' },
    ],
  },
  {
    label: 'fields.housingStatus',
    name: 'familyInfo.housingStatus',
    type: 'select',
    required: true,
    options: [
      { value: 'owned', label: 'options.owned' },
      { value: 'rented', label: 'options.rented' },
      { value: 'living-with-family', label: 'options.livingWithFamily' },
      { value: 'homeless', label: 'options.homeless' },
    ],
  },
  {
    label: 'fields.currency',
    name: 'familyInfo.currency',
    type: 'select',
    required: true,
    dynamicOptions: 'currencies',
  },
  {
    label: 'fields.monthlyIncome',
    name: 'familyInfo.monthlyIncome',
    type: 'number',
    required: true,
    placeholder: '0',
  },
];
