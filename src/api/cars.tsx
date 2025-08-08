import { BACKEND_URL } from "@/config/server";
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


interface CreateCarAdRequest {
  title: string;
  price: number;
  make: string;
  model: string;
  year: number;
  mileage?: number;
  condition: string;
  transmission?: string;
  fuelType?: string;
  images: string[];
  description?: string;
  dealer: string;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
}

export const createCarAd = async (data: CreateCarAdRequest) => {
  const response = await axios.post(`${BACKEND_URL}/ads`, data);
  return response.data;
};
