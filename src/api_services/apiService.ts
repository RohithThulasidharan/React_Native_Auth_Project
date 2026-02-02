import axios from "axios";

import { API_BASE_URL } from "../api_services/api";

export const defaultHeaders = {
    Accept: "application/json",
    'Content-Type': "application/json"
};

export const fetchOptions = {
    cache: 'no-store',
    credentials: 'same-origin'
}

export const axiosClient = axios.create({ baseURL: API_BASE_URL, timeout: 5000, fetchOptions: fetchOptions, headers: defaultHeaders });

axiosClient.interceptors.response.use(
    response => response,
    error => {
        let message = "Something went wrong";
        if (!error.response) {
            message = 'Network error. Please check your connection.';
        } else {
            message = error.response.data?.message ??
                `Request failed with status ${error.response.status}`;
        }

        return Promise.reject({
            message: message,
            status: error.response?.status
        });
    }
);