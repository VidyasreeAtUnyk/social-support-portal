import { TRANSLATION_NAMESPACES } from '@lib/constants';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  label: string;
  name: string;
  type: 'text' | 'select' | 'date' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  dynamicOptions?: 'countries' | 'states';
  dependsOn?: string;
  tooltip?: {
    translationKey: string;
    namespace?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
  };
}

export const personalInfoForm = [
  {
    label: 'fields.name',
    name: 'personalInfo.name',
    placeholder: 'placeholders.name',
    type: 'text',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.nationalId',
    name: 'personalInfo.nationalId',
    placeholder: 'placeholders.nationalId',
    type: 'text',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.gender',
    name: 'personalInfo.gender',
    type: 'select',
    required: true,
    options: [
      { value: 'male', label: 'options.male' },
      { value: 'female', label: 'options.female' },
      { value: 'other', label: 'options.other' },
    ],
  },
  {
    label: 'fields.dob',
    name: 'personalInfo.dob',
    type: 'date',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.address',
    name: 'personalInfo.address',
    placeholder: 'placeholders.address',
    type: 'text',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.city',
    name: 'personalInfo.city',
    placeholder: 'placeholders.city',
    type: 'text',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.state',
    name: 'personalInfo.state',
    type: 'select',
    required: true,
    dependsOn: 'country',
    dynamicOptions: 'states',
    tooltip: {
      translationKey: 'help.selectCountryFirst',
      namespace: TRANSLATION_NAMESPACES.COMMON,
      placement: 'top' as const,
    },
  },
  {
    label: 'fields.country',
    name: 'personalInfo.country',
    type: 'select',
    required: true,
    dynamicOptions: 'countries',
  },
  {
    label: 'fields.email',
    name: 'personalInfo.email',
    placeholder: 'placeholders.email',
    type: 'email',
    required: true,
    component: 'Input',
  },
  {
    label: 'fields.phone',
    name: 'personalInfo.phone',
    placeholder: 'placeholders.phone',
    type: 'tel',
    required: true,
    component: 'Input',
    tooltip: {
      translationKey: 'help.phoneFormat',
      namespace: TRANSLATION_NAMESPACES.COMMON,
      placement: 'top' as const,
    },
  },
];
