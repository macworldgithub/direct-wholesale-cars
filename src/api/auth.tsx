// src/api/auth/api.ts
import { BACKEND_URL } from "@/config/server";
import { RootState } from "@/store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface SignupDealerData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;

  businessName?: string;
  businessType?: string;
  businessLicenseNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  accountType?: string;
  dealerType?: string;

  profileImage?: File | null;
}

export const SignupDealer = createAsyncThunk(
  "dealers/signup",
  async (data: SignupDealerData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName ?? "");
      formData.append("lastName", data.lastName ?? "");
      formData.append("email", data.email ?? "");
      formData.append("password", data.password ?? "");
      formData.append("phone", data.phone ?? "");

      formData.append("businessName", data.businessName ?? "");
      formData.append("businessType", data.businessType ?? "");
      formData.append(
        "businessLicenseNumber",
        data.businessLicenseNumber ?? ""
      );
      formData.append("address", data.address ?? "");
      formData.append("city", data.city ?? "");
      formData.append("state", data.state ?? "");
      formData.append("zipCode", data.zipCode ?? "");
      formData.append("accountType", data.accountType ?? "dealer");
      formData.append("dealerType", "company");

      if (data.profileImage && data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }

      const response = await axios.post(
        `${BACKEND_URL}/dealers/signup`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);
