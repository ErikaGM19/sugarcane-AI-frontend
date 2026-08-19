import { create } from 'zustand';

interface RegisterState {
  step: number;
  email: string;
  password: string;
  passwordConfirm: string;
  setField: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  email: '',
  password: '',
  passwordConfirm: '',
  
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  
  reset: () => set({
    step: 1,
    email: '',
    password: '',
    passwordConfirm: ''
  })
}));
