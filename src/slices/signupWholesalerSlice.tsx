// src/slices/signupDealerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
  name: string;
  email: string;
  password: string;
  businessRegistrationNumber: string;
  phone: string;
  contactPerson?: string;
  address?: string;
  //   profileImage?: File | null;
}

const initialState: SignupState = {
  name: "",
  email: "",
  password: "",
  businessRegistrationNumber: "",
  phone: "",
  contactPerson: "",
  address: "",
  //   profileImage: null,
};

const signupWholeSalerSlice = createSlice({
  name: "SignupWholeSaler",
  initialState,
  reducers: {
    updateSignupField: (
      state,
      action: PayloadAction<{ field: keyof SignupState; value: any }>
    ) => {
      (state[action.payload.field] as any) = action.payload.value;
    },
    // setProfileImage: (state, action: PayloadAction<File | null>) => {
    //   state.profileImage = action.payload;
    // },
    resetSignup: () => initialState,
  },
});

export const {
  updateSignupField,
  // setProfileImage,
  resetSignup,
} = signupWholeSalerSlice.actions;

export default signupWholeSalerSlice;
