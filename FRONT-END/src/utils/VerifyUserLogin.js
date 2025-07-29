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
    queryKey:["me"],
    queryFn: fetchUserData,
    retry: false,
    refetchOnWindowFocus: false,
  });




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
