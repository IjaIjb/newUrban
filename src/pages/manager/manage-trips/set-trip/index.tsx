"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Switch from "@/app/components/switch";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import TypeOfVehicleDropdown from "@/app/components/dropdowns/TypeOfVehicleDropdown";
import parkOBJ from "@/common/classes/park.class";
import { cityFCT, cityLagos } from "@/common/data";
import {
  fetchCitiesOtpionsByState,
  stateOptions,
} from "@/common/data/NigeriaData";
import { cn } from "@/common/helpers";
import useUserTypeRouterPages from "@/common/hooks/useUserTypeRouterPages";
import { selectUserType } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import { destroyCookie } from "nookies";
import { ClipLoader } from "react-spinners";

export default function SetTrips() {
  const [selectedPark, setSelectedPark] = useState<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Park, setPark] = useState<any>([]);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [parkLocation, setParkLocation] = useState();
  const [parkCity, setParkCity] = useState("");
  const [cityObj, setCityObj] = useState<any>([
    {
      label: "select state",
      value: "",
    },
  ]);
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouterPages();

  const userType = useAppSelector(selectUserType)!;

  const getAllParks = async () => {
    parkOBJ.getAllByUser().then((res) => {
      console.log("res", res);

      const option = res?.parks?.map((a: any) => ({
        value: a?.id,
        label: a?.name,
      }));

      console.log("🚀 ~ option ~ option:", option);

      setParkOption(option);
      setPark(res);
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

  const [parkOption, setParkOption] = useState<
    { value: string; label: string }[]
  >([
    {
      value: "",
      label: "no Park found",
    },
  ]);

  const validationSchema = Yup.object().shape({
    departureTime: Yup.string().required("Please enter the departure time."),
    arrivalCity: Yup.string().required("Please enter the arival city."),
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

  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formik = useFormik({
    initialValues: {
      departureTime: "",
      arrivalCity: "",
      arrivalState: "",
      departurePark: "",
      typeOfVechicle: "",
      fare: "",
      date: `${year}-${month}-${day}` || "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      console.log("🚀 ~ onSubmit: ~ values:", values);
      if (selectedPark && parkCity) {
        const data = {
          departurePark: selectedPark.name,
          departureCity: parkCity,
          arrivalCity: values.arrivalCity,
          arrivalState: values.arrivalState,
          fare: values.fare,
          isPublic: `${isPublic}`,
          date: values.date,
          time: values.departureTime,
          vehicleId: values.typeOfVechicle,
          vehicleType: selectedVehicle?.vehicleType,
          parkId: values.departurePark,
          departureDate: values.date,
        };
        console.log(data, "data");
        // addTrip(data);

        pushWithUserTypePrefix("/manage-trips/set-trip/preview", {
          options: { ...data },
          as: "/manage-trips/set-trip/preview",
        });
      } else {
        toast.error("fill all the form fields");
      }
    },
  });

  useEffect(() => {
    setParkCity(
      Park &&
        Park.parks?.find((option: any) => {
          return option.id === selectedPark?.id;
        })?.city
    );
  }, [selectedPark, Park, userType]);

  return (
    <>
      <SubHeader
        header={"Set Trip"}
        hideRight
        onPress={() => {
          destroyCookie(null, "trip");
        }}
      />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
          <Dropdown
            options={parkOption}
            placeholder="Option"
            label="Departure Park"
            value={formik.values.departurePark}
            onSelect={(e: any) => {
              setSelectedPark(
                Park?.parks?.find((option: any) => {
                  return option.id === e;
                })
              );
              formik.setFieldValue("departurePark", e);
            }}
            className={cn(
              "w-[510px] ",
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
            placeholder="Select"
            label="Arrival State"
            value={formik.values.arrivalState}
            onSelect={(e: any) => {
              formik.setFieldValue("arrivalState", e);
            }}
            className={cn(
              "w-[510px] ",
              formik.errors.arrivalState && "border-red-600"
            )}
          />

          <Dropdown
            options={
              fetchCitiesOtpionsByState(formik.values.arrivalState as any) || [
                { id: "", value: "" },
              ]
            }
            placeholder="Select"
            label="Arrival City"
            value={formik.values.arrivalCity}
            onSelect={(e: any) => {
              formik.setFieldValue("arrivalCity", e);
            }}
            className={cn(
              "w-[510px] ",
              formik.errors.arrivalCity && "border-red-600"
            )}
          />
          <Input
            label="Fare"
            type="text"
            id="fare"
            name="fare"
            value={formik.values.fare}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.fare && formik.errors.fare) as boolean}
          />

          <TypeOfVehicleDropdown
            formik={formik}
            setSelectedVehicle={setSelectedVehicle}
          />
        </div>
        <div className=" w-[510px]">
          <div className="flex justify-between mt-10 w-[510px]">
            <p className="text-sm text-gray-500">Posting Type</p>
            <div className="flex ">
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
            disabled={!selectedPark && formik.errors == null && isLoading}
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Set Trip"}
          </Button>
        </div>
      </form>
    </>
  );
}
