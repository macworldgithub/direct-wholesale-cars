import { BACKEND_URL } from "@/config/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PresignedRequest {
  fileName: string;
  fileType: string;
  folder: string;
}

interface PresignedResponse {
  url: string;
  key: string;
}

export const getPresignedUrl = async (
  data: PresignedRequest
): Promise<PresignedResponse> => {
  const response = await axios.post<PresignedResponse>(
    `${BACKEND_URL}/ads/generate-presigned-url`,
    data
  );
  return response.data;
};

export interface CreateCarAdRequest {
  wholesaler: string;
  branch: string;
  stock: string;
  bayNumber: string;
  description: string;
  odometer: number;
  buildDate: string;
  vin: string;
  driveType: string;
  fuelType: string;
  seats: number;
  regoDue: string;
  asking: number;
  available: boolean;
}
interface UploadExcelResponse {
  status: "created" | "updated" | "error";
  vin: string;
  error?: string;
}
export const createCarAd = createAsyncThunk<CarAd, CreateCarAdRequest>(
  "carAds/createCarAd",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/ads`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create car ad"
      );
    }
  }
);

export const uploadExcel = createAsyncThunk<
  UploadExcelResponse[],
  { wholesalerId: string; file: File },
  { rejectValue: string }
>("carAds/uploadExcel", async ({ wholesalerId, file }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post<UploadExcelResponse[]>(
      `${BACKEND_URL}/cars/${wholesalerId}/upload-excel`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to upload Excel file"
    );
  }
});

export interface UpdateCarAdRequest {
  id: string;
  data: CreateCarAdRequest;
}

interface CarAd {
  _id: string;
  wholesaler: string;
  branch: string;
  stock: string;
  bayNumber: string;
  description: string;
  odometer: number;
  buildDate: string;
  vin: string;
  driveType: string;
  fuelType: string;
  seats: number;
  regoDue: string;
  asking: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CarsApiResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: CarAd[];
}

export const fetchAllCarAds = createAsyncThunk<
  CarsApiResponse,
  void,
  { rejectValue: string }
>("ads/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<CarsApiResponse>(`${BACKEND_URL}/cars`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch car ads"
    );
  }
});

export const fetchCarAdById = createAsyncThunk<
  CarAd,
  { wholesalerId: string; vin: string },
  { rejectValue: string }
>(
  "cars/fetchById",
  async ({ wholesalerId, vin }, { rejectWithValue }) => {
    try {
      const response = await axios.get<CarAd>(
        `${BACKEND_URL}/cars/${wholesalerId}/${vin}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch car ad details"
      );
    }
  }
);

export const updateCarAd = createAsyncThunk<
  CarAd,
  { id: string; data: CreateCarAdRequest }
>("carAds/updateCarAd", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/ads/update-car-ad/${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update car ad"
    );
  }
});

export const deleteCarAd = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("carAds/deleteCarAd", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${BACKEND_URL}/ads/delete-car-ad/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete car ad"
    );
  }
});

interface EmailInquiryRequest {
  senderId: string;
  receiverId: string;
  carId: string;
}

interface EmailInquiryResponse {
  message: string;
  success: boolean;
}

export const sendEmailInquiry = createAsyncThunk<
  EmailInquiryResponse,
  EmailInquiryRequest,
  { rejectValue: string }
>(
  "email/sendInquiry",
  async (inquiryData, { rejectWithValue }) => {
    try {
      const response = await axios.post<EmailInquiryResponse>(
        `${BACKEND_URL}/email/inquiry`,
        inquiryData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send inquiry email"
      );
    }
  }
);