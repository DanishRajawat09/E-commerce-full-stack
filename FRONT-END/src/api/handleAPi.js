import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
});

export const logIn = async (path, data) => {
  return await instance.post(path, data, {
    withCredentials: true,
  });
};
export const registerUser = async (path, data) =>
  instance.post(path, data, { withCredentials: true });
export const verifyOTP = async (path, data) =>
  instance.post(path, data, { withCredentials: true });
export const sendOTP = async (path, data) =>
  instance.post(path, data, { withCredentials: true });
export const AddAddress = async (path, data) =>
  instance.post(path, data, { withCredentials: true });
export const createProfile = async (path, data) =>
  instance.post(
    path,
    data,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  export const logOut = async (path, data = {}) =>  instance.post(path , data, {
    withCredentials : true
  })


export const fetchUserData = async () =>{
  try {
  const res = await instance.get("/api/v1/user/", {
    withCredentials: true,
  });

return res.data.data

  } catch (error) {
   if (error.response?.status === 401) {
    throw new Error("unauthorized")
   }
    throw error
  }
}


export const checkResetToken = async (path) =>
  instance.get(path, {
    withCredentials: true,
  });
