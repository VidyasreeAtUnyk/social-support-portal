import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  currentStep: number;
  personalInfo: {
    name: string;
    nationalId: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  };
  familyInfo: {
    maritalStatus: string;
    dependents: number;
    employmentStatus: string;
    monthlyIncome: number;
    housingStatus: string;
  };
  situationDescriptions: {
    financialSituation: string;
    employmentCircumstances: string;
    reasonForApplying: string;
  };
}

const initialState: FormState = {
  currentStep: 1,
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
  },
  situationDescriptions: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    updatePersonalInfo(state, action: PayloadAction<Partial<FormState['personalInfo']>>) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateFamilyInfo(state, action: PayloadAction<Partial<FormState['familyInfo']>>) {
      state.familyInfo = { ...state.familyInfo, ...action.payload };
    },
    updateSituationDescriptions(
      state,
      action: PayloadAction<Partial<FormState['situationDescriptions']>>,
    ) {
      state.situationDescriptions = {
        ...state.situationDescriptions,
        ...action.payload,
      };
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalInfo,
  updateFamilyInfo,
  updateSituationDescriptions,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
