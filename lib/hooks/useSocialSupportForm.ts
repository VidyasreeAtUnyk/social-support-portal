import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import {
  FamilyInfoFormData,
  familyInfoSchema,
  PersonalInfoFormData,
  personalInfoSchema,
  SituationDescriptionsFormData,
  situationDescriptionsSchema,
} from '@lib/validation/schemas';

import {
  resetForm,
  updateFamilyInfo,
  updatePersonalInfo,
  updateSituationDescriptions,
} from '@lib/store/formSlice';

interface RootState {
  form: {
    personalInfo: PersonalInfoFormData;
    familyInfo: FamilyInfoFormData;
    situationDescriptions: SituationDescriptionsFormData;
    currentStep: number;
  };
}

export interface FormData {
  personalInfo: PersonalInfoFormData;
  familyInfo: FamilyInfoFormData;
  situationDescriptions: SituationDescriptionsFormData;
}

// No more defaultValues duplication — Redux is the single source of truth
export const useSocialSupportForm = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);
  const { t } = useTranslation(['step1', 'step2', 'step3', 'common']);

  const form = useForm<FormData>({
    defaultValues: {
      personalInfo: formState.personalInfo,
      familyInfo: formState.familyInfo,
      situationDescriptions: formState.situationDescriptions,
    },
    mode: 'onChange',
  });

  // Sync React Hook Form → Redux (auto on every change)
  useEffect(() => {
    const subscription = form.watch((data) => {
      dispatch(updatePersonalInfo(data.personalInfo));
      dispatch(updateFamilyInfo(data.familyInfo));
      dispatch(updateSituationDescriptions(data.situationDescriptions));
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  // Step-wise schema validation
  const validateStep = (step: number): boolean => {
    let schema;
    let data;

    switch (step) {
      case 1:
        schema = personalInfoSchema;
        data = form.getValues('personalInfo');
        break;
      case 2:
        schema = familyInfoSchema;
        data = form.getValues('familyInfo');
        break;
      case 3:
        schema = situationDescriptionsSchema;
        data = form.getValues('situationDescriptions');
        break;
      default:
        return false;
    }

    try {
      schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            // Determine current step object prefix
            const prefix = ['personalInfo', 'familyInfo', 'situationDescriptions'][step - 1];

            // Translate the message using `t`
            const translatedMessage = t(err.message as string, { ns: 'step' + step }) || '';

            form.setError(`${prefix}.${err.path}` as any, {
              type: 'manual',
              message: translatedMessage,
            });
          }
        });
      }
      return false;
    }
  };

  // 🔄 Reset the entire form
  const clearForm = () => {
    dispatch(resetForm());
    form.reset({
      personalInfo: {
        name: '',
        nationalId: '',
        dob: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
      },
      familyInfo: {
        maritalStatus: '',
        dependents: 0,
        employmentStatus: '',
        monthlyIncome: 0,
        housingStatus: '',
        currency: '',
      },
      situationDescriptions: {
        financialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
      },
    });
  };

  return {
    form,
    validateStep,
    clearForm,
  };
};
