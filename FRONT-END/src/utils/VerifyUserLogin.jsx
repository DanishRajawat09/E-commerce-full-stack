import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../api/handleAPi";
import { useDispatch } from "react-redux";
import { addUserData, clearUserData } from "../features/userDetailSlice";
import { useEffect } from "react";

const CheckUserLogin = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      dispatch(addUserData({ ...data.data.data }));
    } else {
      dispatch(clearUserData());
    }
  }, [data, isSuccess, dispatch, isError]);
};

export default CheckUserLogin;
