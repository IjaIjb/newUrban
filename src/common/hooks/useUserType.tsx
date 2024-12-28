import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export const useUserType = () => {
  const [userType, setUserType] = useState();

  useEffect(() => {
    const cookies = parseCookies();
    const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
    setUserType(storedUser?.userType);
  }, []);

  return userType;
};
