"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { IoIosLock } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import SubHeader from "@/app/components/headers/sub-header";
import { useAppSelector } from "@/redux/store";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { FiPhoneCall } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { VscBell } from "react-icons/vsc";
import Switch from "@/app/components/switch";

export default function Settings() {
  return (
    <div className="">
      <SubHeader header="Settings" />
      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <ProfileSettings />
        <ResetPassword />
        <NotificationSettings />
        <RequestHelp />
        <TermsAndConditions />
      </div>
    </div>
  );
}

const ProfileSettings = () => {
  const user = useAppSelector(selectAuthUser)!;

  type ResetPassValues = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    city: string;
  };

  const [editing, setEditing] = React.useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().required("Email is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik<ResetPassValues>({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      city: user?.city || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("clicked", values);
    },
  });

  const firstInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border row-span-2 rounded-lg p-10 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaUserEdit className="mr-2 text-primary" size={24} />
          <p className="text-primary font-semibold">My Profiles</p>
        </div>
        <button className="text-primary underline  px-6 py-2 flex items-center">
          Edit
        </button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Image
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
          alt={""}
          width={70}
          height={70}
          className="rounded-lg border border-gray-300"
        />
        <button className="text-primary  hover:text-primary_dark border bg-primary_light text-xs  rounded-full px-4 py-2 flex items-center">
          Change Picture
        </button>
      </div>
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <Input
          ref={firstInputRef}
          label="First Name"
          type={"text"}
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          label="Last Name"
          type={"text"}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={formik.touched.lastName && formik.errors.lastName}
        />
        <Input
          label="Phone Number"
          type={"number"}
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={formik.touched.lastName && formik.errors.lastName}
        />
        <Input
          label="Email"
          type={"email"}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="City"
          type={"text"}
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={formik.touched.city && formik.errors.city}
        />
        <Button
          type="submit"
          disabled={!editing || !formik.isValid}
          className=" mt-10 float-right w-36 text-white"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

const ResetPassword = () => {
  type ResetPassValues = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };

  const [editing, setEditing] = React.useState(false);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Password is required"),
    newPassword: Yup.string().required("Password is required"),
    confirmNewPassword: Yup.string().required("Password is required"),
  });

  const formik = useFormik<ResetPassValues>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("clicked", values);
    },
  });

  const firstInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border row-span-1 rounded-lg p-10 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <IoIosLock className="mr-2 text-primary" size={24} />
          <p className="text-primary font-semibold">Reset Password</p>
        </div>
        <button
          onClick={() => {
            if (firstInputRef) {
              firstInputRef?.current?.focus();
              setEditing(true);
            }
          }}
          className="text-primary underline  px-6 py-2 flex items-center"
        >
          Edit
        </button>
      </div>
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <Input
          ref={firstInputRef}
          label="Current Password"
          type={"password"}
          id="currentPassword"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={!editing}
          error={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        />
        <Input
          label="New Password"
          type={"password"}
          id="newPassword"
          name="newPassword"
          disabled={!editing}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && formik.errors.newPassword}
        />
        <Input
          label="Confirm Password"
          type={"password"}
          disabled={!editing}
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
        />

        <div>
          <Button
            type="submit"
            disabled={!editing || !formik.isValid}
            className=" mt-10 float-right w-36 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

const RequestHelp = () => {
  return (
    <div className="border row-span-1 flex items-center rounded-lg p-10 ">
      <FiPhoneCall className="text-primary" />
      <span className="text-primary ml-2 font-semibold">Request Help</span>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="border row-span-1 rounded-lg p-10 ">
      <div className="flex items-center">
        <VscBell className="text-primary" />
        <span className="text-primary font-semibold ml-2">
          Notification Settings
        </span>
      </div>
      <div className="mt-4 space-y-4">
        <Switch
          label={"Receive all Notifications"}
          checked={false}
          setchecked={null}
        />
        <Switch
          label={"Receive all Notifications"}
          checked={false}
          setchecked={null}
        />
        <Switch
          label={"Receive all Notifications"}
          checked={false}
          setchecked={null}
        />
        <Switch
          label={"Only notifications for trips"}
          checked={true}
          setchecked={null}
        />
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  return (
    <div className="border row-span-1 flex items-center rounded-lg p-10 ">
      <GrNotes className="text-primary" />
      <span className="text-primary font-semibold ml-2">
        Terms and Conditions
      </span>
    </div>
  );
};
