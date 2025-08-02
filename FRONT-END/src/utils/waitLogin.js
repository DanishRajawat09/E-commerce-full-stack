// utils/WaitForLogin.js

import { fetchUserData } from "../api/handleAPi";

export const waitForLogin = async ({ queryClient, navigate, route }) => {
  let attempts = 0;
  const maxAttempts = 10;
  const interval = 300;

  const tryLogin = async () => {
    attempts++;

    try {
      const user = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: fetchUserData,
        staleTime: 0,
      });

      if (user) {
        navigate(route, { replace: true });
        return;
      }
    } catch (error) {
      // Ignore error if still unauthorized
    }

    if (attempts < maxAttempts) {
      setTimeout(tryLogin, interval);
    } else {
      console.error("Login timeout — user cookie not set");
    }
  };

  tryLogin();
};
