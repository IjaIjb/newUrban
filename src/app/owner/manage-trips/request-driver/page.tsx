"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import parkOBJ from "@/common/classes/park.class";
import providerOBJs from "@/common/classes/provider";
import tripOBJs from "@/common/classes/trip.class";
import { ClipLoader } from "react-spinners";
import BasicModal from "./modal";

export default function RequestDriver() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [providerAgency, setProviderAgency] = useState<any>();
  const [selectedPark, setSelectedPark] = useState<any>();
  const [selectedTrip, setSelectedTrip] = useState<any>();
  const [Trip, setTrip] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProviderAgency, setAllProviderAgency] = useState<any[]>([]);
  const [paramsData, setParamsData] = useState<any>();
  const [selectedRegion, setSelectedRegion] = useState<any>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTripData, setSelectedTripData] = useState<any>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [parks, setParks] = useState<any[]>([]);

  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAllByUser();
      console.log("park ress::", res);
      setParks(res?.parks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllParks();
  }, []);

  const getAllTrips = async () => {
    tripOBJs.getForDriverRequest(selectedPark).then((res) => {
      console.log(res, "trips");
      setTrip(res);
    });
  };

  useEffect(() => {
    getAllTrips();
  }, [selectedPark]);

  useEffect(() => {
    const getAllProviderAgency = async () => {
      providerOBJs.getAll(selectedRegion).then((res) => {
        console.log(res, "provider agency");
        setAllProviderAgency(res?.data);
      });
    };
    getAllProviderAgency();
  }, [selectedRegion]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    if (params?.tripCode) {
      setSelectedTrip(params?.tripCode);
      setParamsData(params);
    }
    console.log(params?.tripCode, "trip info from link");
  }, []);

  useEffect(() => {
    const tripData = Trip.find((trip: any) => trip.tripCode === selectedTrip);
    setSelectedTripData(tripData);
  }, [selectedTrip, Trip]);

  let TripOption =
    Trip.length > 0
      ? Trip.map((a: any) => ({
          value: a?.tripCode,
          label: a?.tripCode,
        }))
      : [{ value: null, label: "No Trip found" }];

  let providerAgencyOption =
    allProviderAgency.length > 0 && selectedRegion
      ? allProviderAgency.map((a: any) => ({
          value: a?.id,
          label: a?.companyName,
        }))
      : [{ value: null, label: "No Provider found" }];

  const validationSchema = Yup.object().shape({});
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async (values: any) => {
      if (providerAgency && selectedPark) {
        handleOpen();
      } else {
        setIsLoading(false);
        toast.error("Fill all the form fields");
      }
    },
  });

  const parkRegion = [
    { value: "NORTH_CENTRAL", label: "NORTH CENTRAL" },
    { value: "NORTH_EAST", label: "NORTH EAST" },
    { value: "SOUTH_EAST", label: "SOUTH EAST" },
    { value: "SOUTH_WEST", label: "SOUTH WEST" },
    { value: "SOUTH_SOUTH", label: "SOUTH SOUTH" },
    { value: "NORTH_WEST", label: "NORTH WEST" },
  ];

  const handleSubmitFromModal = () => {
    setIsLoading(true);

    let values = {
      providerAgencyId: providerAgency,
      parkId: selectedPark,
      tripCode: selectedTrip,
    };

    tripOBJs
      .requestDriver(values)
      .then((res) => {
        console.log(res, "response data");
        toast.success(res.data?.message);
        setIsLoading(false);
        handleClose();
        pushWithUserTypePrefix("/manage-trips");
      })
      .catch((err) => {
        console.error("An error occurred", err);
        toast.error(err?.response?.data?.message);
        handleClose();
        setIsLoading(false);
      });
  };

  const option = parks.map((park) => ({
    value: park.id,
    label: park.name,
  })) || [{ value: "", label: "No Park found" }];

  return (
    <Suspense>
      <SubHeader header="Request Driver" hideRight />
      <BasicModal
        header=""
        body={{
          providerAgencyId: providerAgency,
          tripCode: `${selectedTripData?.endState}`,
        }}
        handleClose={handleClose}
        open={open}
        handleOpen={handleOpen}
        handleSubmitFromModal={handleSubmitFromModal}
        isLoading={isLoading}
      />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className="w-[510px]">
          <Dropdown
            options={option}
            placeholder="Select Park"
            label="Select Park"
            value={selectedPark}
            error={!selectedPark}
            onSelect={(e: any) => setSelectedPark(e)}
            className="w-[510px]"
          />

          <Dropdown
            options={parkRegion}
            placeholder="Option"
            label="Select Region"
            onSelect={(e: any) => setSelectedRegion(e)}
            value={selectedRegion}
            className="w-[510px]"
          />

          <Dropdown
            options={providerAgencyOption}
            placeholder="Option"
            label="Select Provider Agency"
            onSelect={(e: any) => setProviderAgency(e)}
            value={providerAgency}
            className="w-[510px]"
          />

          {!paramsData && (
            <Dropdown
              options={TripOption}
              placeholder="Option"
              label="Select Trip"
              onSelect={(e: any) => setSelectedTrip(e)}
              className="w-[510px]"
              value={selectedTrip}
            />
          )}

          <Button
            disabled={!selectedPark || !providerAgency}
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Submit Request"}
          </Button>
        </div>
      </form>
      <ToastContainer />
    </Suspense>
  );
}
