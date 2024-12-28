"use client";
import Header from "../../(components)/header";
import { useFormik } from "formik";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckBox from "@/app/components/checkbox";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authOBJ from "@/common/classes/auth.class";
import countryList from "react-select-country-list";
import { ClipLoader } from "react-spinners";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { handleCountrySelect } from "@/app/components/handleSelect";
import { cn } from "@/common/helpers";
export default function ParkManager() {
  const options = [
    { label: "Individual", value: "individual" },
    { label: "Corporate", value: "corporate" },
  ];

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const router = useRouter();
  const validationSchema = Yup.object({
    userType: Yup.string().required("User Type is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
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
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      userType: options[0].value,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("submittes");
      authOBJ
        .register(
          {
            firstName: values.firstName,
            lastName: values.lastName,
            country: values.country,
            phoneNumber: values.phoneNumber,
            email: values.email,
            deviceToken: "12345",
            password: values.password,
            retypePassword: values.confirmPassword,
          },
          "parkManager"
        )
        .then((res: any) => {
          console.log(res, "from submitting form");
          toast.success(res?.data.message);
          //get user info
          authOBJ.currentUser();
          //redirect to login
          router.push("/auth/login");
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });
  // const handleCOuntrySelect = (event: SelectChangeEvent) => {
  //   console.log("event.target.value", event.target.value)
  //   setCountry(event.target.value as string);
  // };
  return (
    <div>
      <div>
        <Header
          heading="Sign Up as Park Manager"
          // desc='Please select any of the options below'
          // step={1}
        />
      </div>
      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <Input
            label="First Name"
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Last Name"
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Phone Number"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={(event) => {
              let phoneNumber = event.target.value.replace(/\D/g, "");
              phoneNumber = phoneNumber.slice(0, 11);
              formik.setFieldValue("phoneNumber", phoneNumber);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            // icon={<LockClosedIcon />}
          />

          <Box className=" mt-[2rem] w-full">
            <Typography className="text-sm font-medium text-gray-700">
              Select Country
            </Typography>
            <Select
              id="demo-simple-select"
              value={formik.values.country}
              className={cn(
                "block h-[44px] w-full  border-arsh border justify-between rounded-md shadow-sm  font-medium text-gray-700 hover:bg-gray-50 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ",
                formik.touched.country &&
                  formik.errors.country &&
                  "border-red-600"
              )}
              onChange={(e) => handleCountrySelect(e, formik.setFieldValue)}
            >
              {countryList()
                .getData()
                .map((a: any, i: number) => {
                  return (
                    <MenuItem key={a.value} value={a.label}>
                      {a.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>

          <Input
            // containerStyle='mt-8'
            label="Password"
            type={"password"}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          <Input
            // containerStyle='mt-8'
            label="Retype Password"
            type={"password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <div className="mt-4">
            <CheckBox
              label={
                <p>
                  I agree to the{" "}
                  <span className="text-primary font-bold">Urban Terms</span>
                </p>
              }
              checked={isChecked}
              labelStyle="text-sm"
              inputStyle="h-4 w-4"
              onChange={handleCheckboxChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-10 text-white"
            disabled={isLoading || !isChecked}
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "sign up"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
