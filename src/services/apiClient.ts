import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

Responsibilities:

base URL configuration

withCredentials enabled if cookies are used

attach standard headers

standardize request/response handling