"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useState } from "react";

import dispatch from "@/common/classes/dispatch.class";
import { USER_TYPE } from "@/common/types";
import { parseCookies } from "nookies";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function OwnerForm() {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];

  const [selectedPark, setSelectedPark] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  const cookies: any = parseCookies();
  const dispatchDetails = cookies?.editDispatch
    ? JSON.parse(cookies?.editDispatch)
    : {};
  console.log("dispatchDetails?.id");
  const dispatchId: string = dispatchDetails?.id;
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      oldpassword: "",
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string()
        .matches(/[A-Z]/, "Password must contain at least one capital letter")
        .matches(
          /[a-zA-Z0-9]/,
          "Password must be alphanumeric and include at least one digit"
        )
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
        )
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      password: Yup.string()
        .matches(/[A-Z]/, "Password must contain at least one capital letter")
        .matches(
          /[a-zA-Z0-9]/,
          "Password must be alphanumeric and include at least one digit"
        )
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
        )
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values: any) => {
      setIsLoading(true);
      const data = {
        password: values.password,
        oldpassword: values.oldpassword,
      };
      dispatch
        .restPassword(dispatchId, data)
        .then((res: any) => {
          console.log(res, "data form dispatch");
          if (res?.success) {
            toast.success(res?.message);
            //redirect to park
            userType === USER_TYPE.PARK_OWNER
              ? pushWithUserTypePrefix("/park/dispatch-officers/owner")
              : pushWithUserTypePrefix("/park/dispatch-officers");
          } else {
            toast.error(res?.data?.message);
          }

          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });
  console.log(formik.errors, formik.values, "form erros");
  return (
    <div>
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Old Password"
          type="password"
          id="oldpassword"
          name="oldpassword"
          value={formik.values.oldpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldpassword && formik.errors.oldpassword}
        />
        <Input
          label="New Password"
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          type="submit"
          className="w-full mt-10 text-white"
          // disabled={!formik.values['userType'] ? true : undefined}
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Reset Password"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
