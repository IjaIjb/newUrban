"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Switch from "@/app/components/switch";
import { useFormik } from "formik";
import { useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import parkOBJ from "@/common/classes/park.class";
import { cityFCT, cityLagos } from "@/common/data";
import {
  fetchCitiesOtpionsByState,
  stateOptions,
} from "@/common/data/NigeriaData";
import { updateEditTrip } from "@/common/db";
import { cn } from "@/common/helpers";
import useUserTypeRouterPages from "@/common/hooks/useUserTypeRouterPages";
import { USER_TYPE } from "@/common/types";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import { destroyCookie } from "nookies";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function SetTrips() {
  const { pushWithUserTypePrefix, goBack, query } = useUserTypeRouterPages();
  const data = query as any;

  const [selectedPark, setSelectedPark] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Park, setPark] = useState<any>([]);
  const [trips, setTrips] = useState<any>(null);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [parkLocation, setParkLocation] = useState<string | null>(null);
  const [parkCity, setParkCity] = useState("");
  const [cityObj, setCityObj] = useState<any>([
    {
      label: "select state",
      value: "",
    },
  ]);

  const tripId = data?.tripId as string;

  const userData = useSelector((a: any) => a?.authUser?.authUser);
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  useLayoutEffect(() => {
    const fetchTrip = async () => {
      setIsLoading(true);
      setTrips(data);
      setSelectedPark(data.parkId);
      setIsPublic(data?.isPublic === undefined ? true : !!data?.isPublic);
      setParkLocation(data?.arrivalState!);
      setIsLoading(false);
    };
    fetchTrip();
  }, []);

  const getAllParks = async () => {
    parkOBJ.getAllByUser().then((res) => {
      if (userType === USER_TYPE.PARK_MANAGER) {
        const resForParkManager = res?.parks.filter(
          (a: { parkManagerId: any }) => a?.parkManagerId === userData?.id
        );
        setPark(resForParkManager);
      } else {
        setPark(res);
      }
    });
  };

  useEffect(() => {
    if (parkLocation === "abuja") {
      setCityObj(cityFCT);
    } else {
      setCityObj(cityLagos);
    }
  }, [parkLocation]);

  useEffect(() => {
    getAllParks();
  }, []);

  useEffect(() => {
    if (userType === USER_TYPE.PARK_MANAGER) {
      setParkCity(
        Park && Park.find((option: any) => option.id === selectedPark)?.city
      );
    } else {
      setParkCity(
        Park &&
          Park.parks?.find((option: any) => option.id === selectedPark)?.city
      );
    }
  }, [selectedPark, Park, userType]);

  let parkOption = [{ value: "", label: "no Park found" }];

  if (userType === USER_TYPE.PARK_MANAGER && Park?.length >= 1) {
    parkOption = Park.map((a: any) => ({
      value: a?.id,
      label: a?.name,
    }));
  } else if (Park && Park?.parks?.length >= 1) {
    parkOption = Park?.parks?.map((a: any) => ({
      value: a?.id,
      label: a?.name,
    }));
  }

  const validationSchema = Yup.object().shape({
    departureTime: Yup.string().required("Please enter the departure time."),
    arrivalCity: Yup.string().required("Please enter the arrival city."),
    arrivalState: Yup.string().required("Please enter the arrival state."),
    departurePark: Yup.string().required("Please enter the departure park."),
    typeOfVechicle: Yup.string().required("Please enter the vehicle type."),
    fare: Yup.string()
      .required("Please enter the fare.")
      .test(
        "minFare",
        "Fare must be at least 1000",
        (value) => parseInt(value, 10) >= 1000
      ),
    date: Yup.string().required("Please enter the date."),
  });

  const formik = useFormik({
    initialValues: {
      departureTime: trips?.departureTime || "",
      arrivalCity: trips?.arrivalCity || "",
      arrivalState: trips?.arrivalState || "",
      departurePark: trips?.parkId || "",
      typeOfVechicle: trips?.vehicleType || "",
      fare: trips?.fare || 0,
      date: trips?.date || new Date().toISOString().split("T")[0],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setIsLoading(true);

      if (selectedPark && parkLocation) {
        const data = {
          startLocation: values.departurePark,
          startCity: parkLocation,
          arrivalCity: values.arrivalCity,
          arrivalState: values.arrivalState,
          fare: values.fare,
          isPublic: `${isPublic}`,
          date: values.date,
          time: values.departureTime,
          vehicleType: values.typeOfVechicle,
          tripId,
        };

        await updateEditTrip(tripId!, data);

        pushWithUserTypePrefix(`/manage-trips/edit/preview/`, {
          options: { ...data },
          as: `/owner/manage-trips/edit/preview`,
        });
        setIsLoading(false);
      } else {
        toast.error("Please fill all form fields.");
        setIsLoading(false);
      }
    },
  });

  const carType = [
    { value: "bus", label: "Bus" },
    { value: "minibus", label: "Mini bus" },
    { value: "sedan", label: "Sedan" },
  ];

  return (
    <>
      <SubHeader
        header={"Edit Trip"}
        hideRight
        onPress={() => {
          destroyCookie(null, "trip");
        }}
      />
      {
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <div className="w-[510px]">
            <Dropdown
              options={parkOption}
              placeholder="Option"
              label="Departure Park"
              value={formik.values.departurePark}
              onSelect={(e: any) => {
                setSelectedPark(e);
                formik.setFieldValue("departurePark", e);
              }}
              className={cn(
                "w-[510px]",
                formik.errors.departurePark && "border-red-600"
              )}
            />
            <Input
              label="Departure City"
              type="text"
              id="departureCity"
              name="departureCity"
              disabled
              value={parkCity!}
              onChange={() => null}
            />
            <Input
              label="Date"
              type="date"
              id="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.date && formik.errors.date) as boolean}
            />
            <Input
              label="Departure Time"
              type="time"
              id="departureTime"
              name="departureTime"
              value={formik.values.departureTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.departureTime &&
                  formik.errors.departureTime) as boolean
              }
            />

            <Dropdown
              options={stateOptions}
              placeholder="State"
              label="Arrival State"
              value={formik.values.arrivalState}
              onSelect={(e: any) => {
                setParkLocation(e);
                formik.setFieldValue("arrivalState", e);
              }}
              className={cn(
                "w-[510px]",
                formik.errors.arrivalState && "border-red-600"
              )}
            />

            <Dropdown
              options={
                fetchCitiesOtpionsByState(
                  formik.values.arrivalState as any
                ) || [{ id: "", value: "" }]
              }
              placeholder="Select"
              label="Arrival City"
              value={formik.values.arrivalCity}
              onSelect={(e: any) => {
                formik.setFieldValue("arrivalCity", e);
              }}
              className={cn(
                "w-[510px]",
                formik.errors.arrivalCity && "border-red-600"
              )}
            />
            <Input
              label="Fare"
              type="text"
              id="fare"
              name="fare"
              value={`${formik.values.fare}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.fare && formik.errors.fare) as boolean}
            />
            <Dropdown
              options={carType}
              placeholder="Type of Vehicle"
              value={formik.values.typeOfVechicle}
              onSelect={(e: any) => formik.setFieldValue("typeOfVechicle", e)}
              className={cn(
                "w-[510px]",
                formik.errors.typeOfVechicle && "border-red-600"
              )}
            />
          </div>
          <div className="w-[510px]">
            <div className="flex justify-between mt-10 w-[510px]">
              <p className="text-sm text-gray-500">Posting Type</p>
              <div className="flex">
                <Switch
                  label={isPublic ? "Public" : "Private"}
                  checked={isPublic}
                  setchecked={setIsPublic}
                />
                <Tooltip title="Public posting is the default, making the trip visible to all passengers and dispatch officers. Private trips are only visible to dispatch officers.">
                  <InfoIcon className="text-primary" />
                </Tooltip>
              </div>
            </div>
            <ToastContainer />
            <Button
              disabled={!selectedPark || !parkLocation || isLoading}
              type="submit"
              className="w-full mt-20 text-white"
            >
              {isLoading ? <ClipLoader color="#ffffff" /> : "Edit Trip"}
            </Button>
          </div>
        </form>
      }
    </>
  );
}
