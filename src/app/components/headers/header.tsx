"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import Image from "next/image";
import Link from "next/link";
import { AiFillInfoCircle, AiOutlineLogout } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";

import authOBJ from "@/common/classes/auth.class";
import { deAuth } from "@/redux/reducers/userSlice";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function Header() {
  //get user info
  const dispatch = useAppDispatch();
  const storedUser = useAppSelector(selectAuthUser)! as any;
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  //function to logout user
  const logOut = () => {
    //redirect to home
    authOBJ.logOut();
    dispatch(deAuth());
  };
  return (
    <div className="pt-10 flex items-center justify-between ">
      <div className="flex items-center">
        <Image
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          alt={""}
          width={50}
          height={50}
          className="rounded-full border border-gray-300"
        />
        <div className="ml-4">
          <p>Hello</p>
          <p className="text-xl text-primary font-bold text-uppercase">
            {(storedUser && storedUser?.dispatchName) ||
              storedUser?.firstName ||
              storedUser?.companyName ||
              storedUser?.fullName ||
              (storedUser?.email && storedUser?.email.split("@")[0])}
          </p>
        </div>
      </div>
      <div>
        <div
          className="bg-primary_red bg-opacity-10 text-primary_red px-4 py-3 rounded-full w-96 flex relative"
          role="alert"
        >
          {/* <strong className='font-bold'>Warning!</strong> */}
          <AiFillInfoCircle size={24} />
          <span className="block sm:inline ml-2">
            {storedUser?.verifiedAt === null && "Account is yet to be approved"}
          </span>
        </div>
      </div>
      <div className="relative flex items-center">
        <Link
          href="/notifications"
          className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:cursor"
        >
          <div className="bg-green-500 rounded-full w-3 h-3 absolute top-0 left-0"></div>
          <IoIosNotificationsOutline className="text-gray-600" size={24} />
        </Link>
        <Link
          href="#"
          className="rounded-full w-12 h-12 flex items-center justify-center bg-[red] hover:cursor ml-4"
          onClick={logOut}
        >
          <AiOutlineLogout className="text-white" size={24} />
        </Link>
      </div>
    </div>
  );
}
