import { useEffect, useState } from "react";
import authOBJ from "../classes/auth.class"

export const useUserInfo = () => {
  const [user, setUser] = useState();

  useEffect(() => {
   authOBJ.currentUser().then((res)=>{
    setUser(res)
   })
  }, []);

  return user;
};
