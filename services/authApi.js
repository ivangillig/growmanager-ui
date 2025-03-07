// app/api/auth.js
import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const { BASE_URL } = publicRuntimeConfig;


export const getUserInfoApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/getUserInfo`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOutRequest = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
