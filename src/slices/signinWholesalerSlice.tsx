import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SigninWholesaler, UpdateDealer } from "@/api/auth";

interface WholeSaler {
  _id: string;
  name: string;
  email: string;
  businessRegistrationNumber: string;
  phone: string;
  contactPerson?: string;
  address?: string;
  // profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginState {
  token: string | null;
  wholesaler: WholeSaler | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: null,
  wholesaler: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const loginWholeSalerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("wholesalerInfo");
      return initialState;
    },
    restoreSession: (state, action: PayloadAction<{ token: string }>) => {
      const wholesalerFromStorage = localStorage.getItem("wholesalerInfo");

      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.wholesaler = wholesalerFromStorage
        ? JSON.parse(wholesalerFromStorage)
        : null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SigninWholesaler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SigninWholesaler.fulfilled, (state, action) => {
        const { accessToken, accountType /*, signedProfileImage */ } =
          action.payload;
        state.loading = false;
        state.token = accessToken;
        state.wholesaler = {
          ...accountType,
          // profileImage: signedProfileImage || accountType.profileImage,
        };
        state.isAuthenticated = true;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("wholesalerInfo", JSON.stringify(state.wholesaler));
      })
      .addCase(SigninWholesaler.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      })
    //   .addCase(UpdateDealer.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(UpdateDealer.fulfilled, (state, action) => {
    //     const { account /*, signedProfileImage */ } = action.payload;
    //     state.loading = false;
    //     state.wholesaler = {
    //       ...account,
    //       // profileImage: signedProfileImage || account.profileImage,
    //     };
    //     localStorage.setItem("wholesalerInfo", JSON.stringify(state.wholesaler));
    //   })
    //   .addCase(UpdateDealer.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload || "Account update failed";
    //   });
  },
});

export const { logout, restoreSession } = loginWholeSalerSlice.actions;
export default loginWholeSalerSlice;
