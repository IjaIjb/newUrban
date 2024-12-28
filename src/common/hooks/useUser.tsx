import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { auth } from "../../../firebase";

export const useUser = () => {
  const [userData, setUser] = useState<any>();

  const getLoginUser = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          resolve(user);
        } else {
          // User is signed out.
          resolve(null);
        }
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const cookies = parseCookies();
      const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
      console.log("userrrrr:::", storedUser);
      const user: any = await getLoginUser();
      setUser({ ...storedUser, ...user });
    };

    fetchData();
  }, []);

  return userData;
};
