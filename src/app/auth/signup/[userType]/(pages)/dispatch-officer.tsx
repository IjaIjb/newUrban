"use client";
import Header from "../../(components)/header";
import { useFormik } from "formik";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import CheckBox from "@/app/components/checkbox";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

export default function DispatchOfficer() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      dispatchName: "",
      email: "",
      phoneNumber: "",
      fullAddress: "",
      dispatcherId: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
    },
  });

  return (
    <div>
      <div>
        <Header
          heading="Sign Up as Dispatch Officer"
          // desc='Please select any of the options below'
          // step={1}
        />
      </div>
      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <Input
            label="Dispatch Name"
            type="text"
            id="dispatchName"
            name="dispatchName"
            value={formik.values.dispatchName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dispatchName && formik.errors.dispatchName}
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
            label="Full Address"
            type="text"
            id="fullAddress"
            name="fullAddress"
            value={formik.values.fullAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullAddress && formik.errors.fullAddress}
            // icon={<LockClosedIcon />}
          />
          <Input
            label="Dispatcher Id"
            type="text"
            id="dispatcherId"
            name="dispatcherId"
            value={formik.values.dispatcherId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dispatcherId && formik.errors.dispatcherId}
            // icon={<LockClosedIcon />}
          />
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
