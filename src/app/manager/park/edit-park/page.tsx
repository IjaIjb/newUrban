"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import SuccessModal from "@/app/components/modal/sucess-modal";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useState } from "react";

import parkOBJ from "@/common/classes/park.class";
import { cityFCT, cityLagos } from "@/common/data";
import {
  fetchCitiesOtpionsByState,
  stateOptions,
} from "@/common/data/NigeriaData";
import { cn } from "@/common/helpers";
import { Park } from "@/common/types";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { destroyCookie, parseCookies } from "nookies";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function EditPark() {
  const options = [
    { label: "Abuja", value: "abuja" },
    { label: "Lagos", value: "lagos" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityObj, setCityObj] = useState<any>([
    {
      label: "select state",
      value: "",
    },
  ]);
  const [parkEditDetails, setParkEditDetails] = useState<any>();
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  const [locationError, setLocationError] = useState<string>("");

  let userData = useAppSelector(selectAuthUser)!;

  const validationSchema = Yup.object().shape({
    parkName: Yup.string().required("Park name is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("City is required"),
    fullAddress: Yup.string().required("Full address is required"),
    // coordinate: Yup.string().required("Coordinate is required"),
    // lat: Yup.string().required("Lat is required"),
    // long: Yup.string().required("Long is required"),
  });
  const cookies: any = parseCookies();

  const parkDetails: Park = cookies?.editPark
    ? JSON.parse(cookies?.editPark)
    : {};
  const formik = useFormik({
    initialValues: {
      parkName: parkDetails?.name,
      state: parkDetails?.state,
      city: parkDetails?.city,
      fullAddress: parkDetails?.fullAddress,
      parkPhoneNumber: "",
      // lat: "",
      // long: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      const data = {
        id: parkDetails?.id,
        name: values.parkName,
        parkOwnerId: userData.id,
        state: values.state,
        city: values.city,
        fullAddress: values.fullAddress,
        // latitude: values.lat,
        // longitude: values.long,
      };
      parkOBJ
        .update(data)
        .then((res) => {
          toast.success(res?.data.message);
          destroyCookie(null, "editPark");
          setIsLoading(false);
          goBack();
        })
        .catch((err) => {
          console.log(err?.message);
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });

  return (
    <div>
      <SubHeader header="Edit Park" hideRight />
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Name of Park"
          type="text"
          id="parkName"
          name="parkName"
          value={formik.values.parkName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.parkName && formik.errors.parkName}
        />
        <Dropdown
          options={stateOptions}
          placeholder="State"
          label="Select State"
          value={formik.values.state}
          onSelect={(e: any) => {
            console.log("🚀 ~ AddPark ~ e:", e);
            if (e == "abuja") {
              setCityObj(cityFCT);
            } else {
              setCityObj(cityLagos);
            }
            formik.setFieldValue("state", e);
          }}
          className={cn("w-[510px]", formik.errors.state && "border-red-600")}
        />

        <Dropdown
          options={
            fetchCitiesOtpionsByState(formik.values.state as any) || [
              { id: "", value: "" },
            ]
          }
          placeholder="City"
          value={formik.values.city}
          label="Select City"
          onSelect={(e: any) => formik.setFieldValue("city", e)}
          className={cn("w-[510px]", formik.errors.city && "border-red-600")}
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
        />
        {/* <div className="flex justify-between w-full">
          <div>
            <Input
              label="Latitude"
              type="text"
              id="coordinate"
              name="coordinate"
              value={formik.values.lat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lat && formik.errors.lat}
            />
          </div>

          <Input
            label="Longitude"
            type="text"
            id="coordinate"
            name="coordinate"
            value={formik.values.long}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.long && formik.errors.long}
          />
        </div> */}
        {/* <div className="mt-2 text-red-600 text-sm">{locationError}</div>

        <Link
          href="#"
          className="mt-3 text-primary items-center hover:underline flex justify-center"
        >
          <FaMapLocationDot />
          <p className="ml-2 hover:underline">Get coordinates</p>
        </Link> */}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-10 text-white"
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Edit Park"}
        </Button>
      </form>
      <SuccessModal
        title="Park Added"
        desc={`You have successfully edited park. ${parkDetails?.name}`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ToastContainer />
    </div>
  );
}
