// src/slices/signupDealerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  businessName?: string;
  businessType?: string;
  businessLicenseNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  accountType?: "dealer" | "buyer";
  dealerType?: "individual" | "company";
  profileImage?: File | null;
}

const initialState: SignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  businessName: "",
  businessType: "",
  businessLicenseNumber: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  accountType: "dealer",
  dealerType: "individual",
  profileImage: null,
};

const signupDealerSlice = createSlice({
  name: "SignupDealer",
  initialState,
  reducers: {
    updateSignupField: (
      state,
      action: PayloadAction<{ field: keyof SignupState; value: any }>
    ) => {
      (state[action.payload.field] as any) = action.payload.value;
    },
    setProfileImage: (state, action: PayloadAction<File | null>) => {
      state.profileImage = action.payload;
    },
    resetSignup: () => initialState,
  },
});

export const { updateSignupField, setProfileImage, resetSignup } =
  signupDealerSlice.actions;

export default signupDealerSlice;
