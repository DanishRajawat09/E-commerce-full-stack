import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../api/handleAPi";

const useCheckUserLogin = () => {
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUserData,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime:0 , // ✅ Don't mark data stale unless you say so
  });
console.log(userData);

  return {
    userData,
    isLoggedIn: !!userData && !isError,
    isLoading,
    isError,
    refetchUser: refetch,
    isSuccess,
  };
};
export default useCheckUserLogin;
