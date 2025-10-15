export interface Step3FieldConfig {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  required?: boolean;
}

export const situationDescriptionsForm: Step3FieldConfig[] = [
  {
    name: 'financialSituation',
    label: 'fields.financialSituation',
    placeholder: 'placeholders.financialSituation',
    description: 'descriptions.financialSituation',
    required: true,
  },
  {
    name: 'employmentCircumstances',
    label: 'fields.employmentCircumstances',
    placeholder: 'placeholders.employmentCircumstances',
    description: 'descriptions.employmentCircumstances',
    required: false,
  },
  {
    name: 'reasonForApplying',
    label: 'fields.reasonForApplying',
    placeholder: 'placeholders.reasonForApplying',
    description: 'descriptions.reasonForApplying',
    required: true,
  },
];
