// src/api/auth/api.ts
import { BACKEND_URL } from "@/config/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SignupDealer = createAsyncThunk(
  "dealers/signup",
  async (data: FormData | Record<string, any>, { rejectWithValue }) => {
    try {
      const isFormData = data instanceof FormData;

      const response = await axios.post(`${BACKEND_URL}/auth/signup/dealer`, data, {
        headers: isFormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" },
      });

      try {
        await sendWelcomeEmail(
          isFormData ? (data.get("email") as string) : (data.email as string),
          "Welcome to Direct Wholesale Cars",
          (isFormData ? (data.get("firstName") as string) : data.firstName) ||
            "Dealer"
        );
      } catch (emailErr) {
        console.error("Signup succeeded, but email sending failed", emailErr);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const SignupWholesaler = createAsyncThunk(
  "signup/wholesaler",
  async (data: FormData | Record<string, any>, { rejectWithValue }) => {
    try {
      const isFormData = data instanceof FormData;

      const response = await axios.post(
        `${BACKEND_URL}/auth/signup/wholesaler`,
        data,
        {
          headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
        }
      );

      try {
        await sendWelcomeEmail(
          isFormData ? (data.get("email") as string) : (data.email as string),
          "Welcome to Direct Wholesale Cars",
          (isFormData ? (data.get("firstName") as string) : data.firstName) ||
            "Wholesaler"
        );
      } catch (emailErr) {
        console.error("Signup succeeded, but email sending failed", emailErr);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

interface Response {
  access_token: string;
  role: "dealer" | "wholesaler";
  user: {
    id: string;
    name: string;
    email: string;
  };
}
export const SigninDealer = createAsyncThunk<
  // Response & { signedProfileImage?: string },
  Response,
  { email: string; password: string },
  { rejectValue: string }
>("login/dealer", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<Response>(
      `${BACKEND_URL}/auth/login/dealer`,
      payload
    );

    // const { accessToken, accountType } = response.data;

    // let signedProfileImage: string | undefined = undefined;

    // try {
    //   const signedRes = await axios.get<{ url: string }>(
    //     `${BACKEND_URL}/dealers/signed-profile-image`,
    //     {
    //       params: { key: accountType.profileImage },
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   );
    //   signedProfileImage = signedRes.data.url;
    // } catch (signedErr) {
    //   console.error("Failed to fetch signed profile image", signedErr);
    // }

    return {
      ...response.data,
      // signedProfileImage,
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

export const SigninWholesaler = createAsyncThunk<
  // Response & { signedProfileImage?: string },
  Response,
  { email: string; password: string },
  { rejectValue: string }
>("login/wholesaler", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<Response>(
      `${BACKEND_URL}/auth/login/wholesaler`,
      payload
    );

    // const { accessToken, accountType } = response.data;
    // let signedProfileImage: string | undefined;

    // try {
    //   const signedRes = await axios.get<{ url: string }>(
    //     `${BACKEND_URL}/wholesalers/signed-profile-image`,
    //     {
    //       params: { key: accountType.profileImage },
    //       headers: { Authorization: `Bearer ${accessToken}` },
    //     }
    //   );
    //   signedProfileImage = signedRes.data.url;
    // } catch (err) {
    //   console.error("Failed to fetch signed profile image", err);
    // }

    return { ...response.data, 
    //  signedProfileImage 
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

interface UpdateDealerResponse {
  message: string;
  account: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    businessLicenseNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    accountType: string;
    profileImage: string;
    receiveUpdates: boolean;
    agreeTerms: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const UpdateDealer = createAsyncThunk<
  UpdateDealerResponse & { signedProfileImage?: string },
  { accountId: string; data: any },
  { rejectValue: string }
>("dealers/update", async ({ accountId, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Unauthorized");

    const isFileUpload = data instanceof FormData;

    const response = await axios.put<UpdateDealerResponse>(
      `${BACKEND_URL}/dealers/${accountId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...(isFileUpload
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" }),
        },
      }
    );

    const { account } = response.data;

    let signedProfileImage: string | undefined;
    if (account.profileImage) {
      try {
        const signedRes = await axios.get<{ url: string }>(
          `${BACKEND_URL}/dealers/signed-profile-image`,
          {
            params: { key: account.profileImage },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        signedProfileImage = signedRes.data.url;
      } catch (err) {
        console.error("Failed to fetch signed profile image", err);
      }
    }

    return {
      ...response.data,
      signedProfileImage,
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update account"
    );
  }
});

const sendWelcomeEmail = async (
  to: string,
  subject: string,
  username: string
) => {
  await axios.post(
    `${BACKEND_URL}/email/send-template`,
    { to, subject, username },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
