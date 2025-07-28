// src/hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../api/handleAPi";


 const CheckUserLogin = () => {
  const {
    data : user,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: false,
  });

  return {
    user,
    isLoggedIn: !!user,
    isLoading,
    isError,
    refetchUser: refetch,
    isSuccess,
  };
};
export default CheckUserLogin