import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
});

const responseDataHandler = (res) => res?.data?.data ?? res?.data;

export const logIn = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};
export const registerUser = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};
export const verifyOTP = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};
export const sendOTP = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};
export const AddAddress = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};
export const forgotPassword = async (path, data) => {
  const res = await instance.post(path, data);
  return await responseDataHandler(res);
};

export const createProfile = async (path, data) => {
  const res = await instance.post(path, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return await responseDataHandler(res);
};

export const logOut = async (path, data = {}) => {
  const res = instance.post(path, data);
  return await responseDataHandler(res);
};

export const fetchUserData = async () => {
  try {
    const res = await instance.get("/api/v1/user/");

    return responseDataHandler(res);
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("unauthorized");
    }
    throw error;
  }
};

export const checkResetToken = async (path) =>  instance.get(path);
