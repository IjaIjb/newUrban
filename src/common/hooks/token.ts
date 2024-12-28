import { parseCookies, setCookie, destroyCookie } from "nookies";

// Get the stored authentication token
export const GetStoredAuthToken = () => {
  const cookies = parseCookies();
  const storedUser: any = cookies.userToken ? cookies.userToken : null;
  return storedUser;
};

export const StoreAuthToken = (data: string) => {
  setCookie(null, "userToken", data, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

// Remove the stored authentication token
export const RemoveStoredAuthToken = () => {
  destroyCookie(null, "userToken", { path: "/" });
};

export const SetUserType = (data: string) => {
  setCookie(null, "userType", data, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const SetUserData: any = (data: string) => {
  setCookie(null, "userData", data, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const GetUserData = () => {
  const cookies = parseCookies();
  const userType: any = cookies.userData ? cookies.userData : null;
  return JSON.parse(userType);
};

export const GetUserType = () => {
  const cookies = parseCookies();
  const userType: any = cookies.userType ? cookies.userType : null;
  return userType;
};

export const RemoveAllToken = () => {
  destroyCookie(null, "userToken", { path: "/" });
  destroyCookie(null, "userData", { path: "/" });
  destroyCookie(null, "userType", { path: "/" });
  window.location.href = "/auth/login";
};

export const SetAllParkData: any = (data: string) => {
  setCookie(null, "AllPark", data, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};
