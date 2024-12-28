"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import Input from "@/app/components/input";
import authOBJ from "@/common/classes/auth.class";
import { cityFCT, cityLagos } from "@/common/data";
import {
  fetchCitiesOtpionsByState,
  stateOptions,
} from "@/common/data/NigeriaData";
import { cn } from "@/common/helpers";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Header from "../../(components)/header";

export default function AddPark() {
  const router = useRouter();

  const cookies = parseCookies();
  const ParkOwner = cookies.ParkOwner ? JSON.parse(cookies.ParkOwner) : null;

  const [isLoading, setIsLoading] = useState(false);
  const [cityObj, setCityObj] = useState<any>([
    {
      label: "select state",
      value: "",
    },
  ]);
  const [coordinateData, setCoordinateData] = useState({
    lat: "",
    long: "",
  });
  const options = [
    { label: "Abuja", value: "abuja" },
    { label: "Lagos", value: "lagos" },
  ];

  const [locationError, setLocationError] = useState<string>("");

  const validationSchema = Yup.object({
    parkName: Yup.string().required("Name of park is required"),
    parkFullAddress: Yup.string().required("Full address is required"),
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    function showPosition(position: any) {
      console.log({ position });
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      setCoordinateData({
        lat: latitude,
        long: longitude,
      });
    }

    function showError(error: any) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setLocationError("Unable to get coordinates please eneter manually");
          break;
        case error.POSITION_UNAVAILABLE:
          setLocationError("Unable to get coordinates please eneter manually");
          break;
        case error.TIMEOUT:
          setLocationError("Unable to get coordinates please eneter manually");
          break;
        case error.UNKNOWN_ERROR:
          setLocationError("Unable to get coordinates please eneter manually");
          break;
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      parkName: "",
      state: "",
      city: "",
      parkFullAddress: "",
      parkState: "",
      parkCity: "",
      // coordinate: `[${coordinateData.lat},${coordinateData.long}]` || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values = {
        // latitude: `${coordinateData.lat}`,
        // longitude: `${coordinateData.long}`,
        parkName: values.parkName,
        parkFullAddress: values.parkFullAddress,
        parkState: values.state,
        parkCity: values.city,
        ...ParkOwner,
      };

      setIsLoading(true);

      console.log(values, "from the park");

      authOBJ
        .register(values, "parkOwner")
        .then((res) => {
          toast.success(res?.data.message);
          router.push("/auth/login");
          destroyCookie(null, "ParkOwner", { path: "/" });
          setIsLoading(false);
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
      <Header heading="Add Park" desc="Add at least one park" step={2} />

      <div>
        <form className="mt-10" onSubmit={formik.handleSubmit}>
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
            type="tel"
            id="parkFullAddress"
            name="parkFullAddress"
            value={formik.values.parkFullAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.parkFullAddress && formik.errors.parkFullAddress
            }
          />

          {/* <Input
            label="Coordinate"
            type="text"
            id="coordinate"
            name="coordinate"
            value={formik.values.coordinate}
            disabled
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.coordinate}
          />
          <div className="mt-2 text-red-600 text-sm">{locationError}</div> */}

          <Button
            type="submit"
            className="w-full mt-10 text-white"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Sign up"}
          </Button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
