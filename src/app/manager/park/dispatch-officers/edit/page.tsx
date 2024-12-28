"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import Input from "@/app/components/input";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import SubHeader from "@/app/components/headers/sub-header";
import dispatch from "@/common/classes/dispatch.class";
import parkOBJ from "@/common/classes/park.class";
import { parseCookies } from "nookies";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function EditDispatchForm() {
  const [selectedPark, setSelectedPark] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { goBack } = useUserTypeRouter();
  const [parks, setParks] = useState<any[]>([]);
  const cookies: any = parseCookies();
  const dispatchDetails = cookies?.editDispatch
    ? JSON.parse(cookies?.editDispatch)
    : {};
  const dispatchId: string = dispatchDetails?.id;
  const formik = useFormik({
    initialValues: {
      dispatcherName: dispatchDetails?.fullName,
      email: dispatchDetails?.email,
      phoneNumber: dispatchDetails?.phoneNumber,
      parkId: dispatchDetails?.parkId,
    },
    validationSchema: Yup.object({
      dispatcherName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      parkId: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits")
        .required("Required")
        .max(11)
        .min(10),
    }),
    onSubmit: async (values: any) => {
      setIsLoading(true);
      const data = {
        dispatcherName: values.dispatcherName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        parkId: values.parkId,
      };
      console.log(selectedPark, "data from the form");

      dispatch
        .update(dispatchId, data)
        .then((res: any) => {
          console.log(res, "data form dispatch");
          toast.success(res?.data.message);
          // //redirect to park
          // userType === USER_TYPE.PARK_OWNER
          //   ? pushWithUserTypePrefix("/park/dispatch-officers/owner")
          //   : pushWithUserTypePrefix("/park/dispatch-officers");
          goBack();

          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });
  console.log("formik errors", formik.errors);
  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAllByUser();
      console.log("park ress::", res);
      const parks: any[] = [];
      setParks(res?.parks);
      // setMainParks(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllParks();
  }, []);
  const option =
    parks &&
    parks.map((park) => {
      if (park) {
        return {
          value: park.id,
          label: park.name,
        };
      } else {
        return {
          value: "",
          label: "no Park found",
        };
      }
    });

  console.log(formik.errors, "form erros");
  return (
    <div>
      <SubHeader header="Edit Dispatch Officer" hideRight />

      <form className="mt-6 w-[510px]" onSubmit={formik.handleSubmit}>
        <Dropdown
          options={option}
          placeholder="Select Park"
          label="Select Park"
          value={formik.values.parkId}
          error={formik.touched.parkId && formik.errors.parkId}
          onSelect={(e: any) => formik.setFieldValue("parkId", e)}
          className="w-[510px]"
        />
        <Input
          label="Dispatcher Name"
          type="text"
          id="dispatcherName"
          name="dispatcherName"
          value={formik.values.dispatcherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dispatcherName && formik.errors.dispatcherName}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          disabled
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          disabled
          value={formik.values.phoneNumber}
          onChange={(event) => {
            let phoneNumber = event.target.value.replace(/\D/g, "");
            phoneNumber = phoneNumber.slice(0, 11);
            formik.setFieldValue("phoneNumber", phoneNumber);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />

        <Button
          type="submit"
          className="w-full mt-10 text-white"
          // disabled={!formik.values['userType'] ? true : undefined}
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Edit Dispatch officer"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
