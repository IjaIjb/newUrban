"use client";
import { useLayoutEffect } from "react";
import { parseCookies } from "nookies";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

import "./dist.css";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Home() {
  const cookies = parseCookies();
  const storedUser = cookies.user ? JSON.parse(cookies.user) : null;
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);
  const router = useRouter();

  console.log("storedUser:::", storedUser, cookies);

  var decoded: any = storedUser && jwt_decode(storedUser?.value);
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded?.exp < currentTime) {
    toast.info("Session expired. Redirecting to login page.");
  }

  useLayoutEffect(() => {
    if (userType === "parkOwner") {
      router.push("/owner");
      return;
    }
    if (userType === "dispatchOfficer") {
      router.push("/dispatch");
      return;
    }
    if (userType === "parkManager") {
      router.push("/manager");
      return;
    }
  }, []);

  return (
    <div className="">
      <ToastContainer />
    </div>
  );
}
