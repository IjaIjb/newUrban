import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { saveUser, getUser } from "./fireStore";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { ParkUserData, USER_TYPE } from "@/common/types";

interface IAuthData {
  email: string;
  password: string;
  extra?: any;
  userData?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (values: any, role: USER_TYPE, type?: string) => {
    try {
      //logic to remove confim password,password
      const { email, password, confirmPassword, ...userValues } = values;
      let updatedValues: ParkUserData = { ...userValues, email_: email };
      const userType = role;
      if (userType) {
        updatedValues = { ...updatedValues, userType };
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      saveUser(user, updatedValues, role)
        .then((res) => {
          if (userType != USER_TYPE.DISPATCH_OFFICER) {
            setCookie(null, "user", JSON.stringify(res), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            });
          }
        })
        .catch((err) => {
          throw err;
        });
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };
  const signIn = async (email: string, password: string, role: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      try {
        const res = await getUser(user.uid, role);
        setCookie(null, "user", JSON.stringify(res), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        console.log(res, "from the auth");
        return res;
      } catch (err) {
        throw err;
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };
  const signOut = async () => {
    try {
      await auth.signOut();
      destroyCookie(null, "user");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };
  const getLoginUser = async () => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading, signUp, signIn, signOut, getLoginUser };
};
