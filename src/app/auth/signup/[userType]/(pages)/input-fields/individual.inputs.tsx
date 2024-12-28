import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { routes } from "@/common/routes";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckBox from "@/app/components/checkbox";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "react-select-country-list";
import { setCookie } from "nookies";
import { ClipLoader } from "react-spinners";
import Select from "@mui/material/Select";
import Link from "next/link";
import { Box, MenuItem, Typography } from "@mui/material";
import { handleCountrySelect } from "@/app/components/handleSelect";
import { cn } from "@/common/helpers";
export default function IndividualInput() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string()
      .max(11, "Phone number must be 11 digits")
      .min(11, "Phone number must be 11 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    parkGeneralName: Yup.string().required("Park general name is required"),
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
      .required("Confirm password is required"),
    country: Yup.string().required("Country is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      parkGeneralName: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      let data = {
        accountCategory: "individual",
        country: values.country,
        firstName: values.firstName,
        lastName: values.lastName,
        parkGeneralName: values.parkGeneralName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        deviceToken: "uefuefue23",
        password: values.password,
        retypePassword: values.confirmPassword,
      };
      setCookie(null, "ParkOwner", JSON.stringify(data), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      //redirect to add park
      router.push(routes.ADD_PARK.path);
      setIsLoading(false);
    },
  });

  return (
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
      <Box className=" mt-[2rem] w-full">
        <Typography className="text-sm font-medium text-gray-700">
          Select Country
        </Typography>
        <Select
          id="demo-simple-select"
          value={formik.values.country}
          className={cn(
            "block h-[44px] w-full  border-arsh border justify-between rounded-md shadow-sm  font-medium text-gray-700 hover:bg-gray-50 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ",
            formik.touched.country && formik.errors.country && "border-red-600"
          )}
          onChange={(e) => handleCountrySelect(e, formik.setFieldValue)}
          onBlur={formik.handleBlur}
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
      <Input
        label="Park General Name"
        type="text"
        id="parkGeneralName"
        name="parkGeneralName"
        value={formik.values.parkGeneralName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.parkGeneralName && formik.errors.parkGeneralName}

        // icon={<LockClosedIcon />}
      />
      <Input
        //
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
        //
        label="ReType Password"
        type={"password"}
        id="confirmPassword"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
      <div className="mt-4">
        <CheckBox
          label={
            <Link href="/term-and-condition">
              I agree to the{" "}
              <span className="text-primary font-bold">Urban Terms</span>
            </Link>
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
        // disabled={!formik.values['userType'] ? true : undefined}
      >
        {isLoading ? <ClipLoader color="#ffffff" /> : "proceed to add park"}
      </Button>
      <ToastContainer />
    </form>
  );
}
