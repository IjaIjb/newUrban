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

import providerOBJs from "@/common/classes/provider";
import tripOBJs from "@/common/classes/trip.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { ClipLoader } from "react-spinners";
import BasicModal from "./modal";

export default function RequestDriver() {
  const user = useAppSelector(selectAuthUser);

  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [providerAgency, setProviderAgency] = useState();
  const [selectedPark, setSelectedPark] = useState();
  const [Trip, setTrip] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProviderAgency, setAllProviderAgency] = useState<any>([]);
  const [paramsData, setParamsData] = useState<any>();
  const [selectedRegion, setSelectedRegion] = useState<any>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllTrips = async () => {
    tripOBJs.getForDriverRequest(user?.park?.id).then((res) => {
      console.log(res, "trips");
      setTrip(res);
    });
  };

  useEffect(() => {
    getAllTrips();
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

    // Convert the searchParams to a plain object
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    if (params?.tripCode) {
      setSelectedPark(params?.tripCode);
      setParamsData(params);
    }
    console.log(params?.tripCode, "trip info from link");
  }, []);

  let parkOption: [{ value: any; label: string }];

  let TripOption: any = [];

  if (Trip && Trip?.length >= 1) {
    TripOption = Trip?.map((a: any) => ({
      value: a?.tripCode,
      label: a?.tripCode,
    }));
  } else {
    TripOption = [
      {
        value: null,
        label: "no Trip found",
      },
    ];
  }
  let providerAgencyOption: [{ value: any; label: string }];
  if (allProviderAgency && allProviderAgency.length >= 1 && selectedRegion) {
    providerAgencyOption = allProviderAgency.map((a: any) => ({
      value: a?.id,
      label: a?.companyName,
    }));
  } else {
    providerAgencyOption = [
      {
        value: null,
        label: "no Provider found",
      },
    ];
  }

  const validationSchema = Yup.object().shape({});
  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: async (values: any) => {
      if (
        providerAgency &&
        providerAgency != null &&
        selectedPark &&
        selectedPark !== null
      ) {
        handleOpen();
      } else {
        setIsLoading(false);
        toast.error("fill all the form fields");
      }
    },
  });
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = (isChecked: boolean) => {
    setIsToggled(isChecked);
  };
  const parkRegion = [
    { value: "NORTH_CENTRAL", label: "NORTH CENTRAL" },
    { value: "NORTH_EAST", label: "NORTH EAST" },
    { value: "SOUTH_EAST", label: "SOUTH EAST" },
    { value: "SOUTH_WEST", label: "SOUTH WEST" },
    { value: "SOUTH_SOUTH", label: "SOUTH SOUTH" },
    { vlaue: "NORTH_WEST", label: "NORTH WEST" },
  ];
  const handleSubmitFromModal = () => {
    let values = {
      providerAgencyId: providerAgency,
      tripCode: selectedPark,
      parkId: user?.park?.id,
    };
    tripOBJs
      .requestDriver(values)
      .then((res) => {
        console.log(res, "this is the respones data");
        toast.success(res.data?.message);
        setIsLoading(false);
        handleClose();
        pushWithUserTypePrefix("/manage-trips");
      })
      .catch((err) => {
        console.error("an error occcured", err);
        toast.error(err);
        handleClose();
        setIsLoading(false);
      });
  };
  return (
    <Suspense>
      <SubHeader header="Request Driver" hideRight />
      <BasicModal
        header=""
        body={{
          providerAgencyId: providerAgency,
          tripCode: selectedPark,
        }}
        handleClose={handleClose}
        open={open}
        handleOpen={handleOpen}
        handleSubmitFromModal={handleSubmitFromModal}
        isLoading={isLoading}
      />
      <form className="mt-10" onSubmit={formik.handleSubmit}>
        <div className=" w-[510px]">
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
              onSelect={(e: any) => setSelectedPark(e)}
              className="w-[510px]"
              value={selectedPark}
              // error={formik.touched.departurePark && formik.errors.departurePark}
            />
          )}

          {/* <Textarea
            label="Additional Info"
            type="text"
            id="additionalInfo"
            name="additionalInfo"
            value={formik.values.additionalInfo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.additionalInfo && formik.errors.additionalInfo
            }
          /> */}
          <Button
            disabled={
              !selectedPark &&
              !providerAgency &&
              selectedPark === null &&
              providerAgency === null
            }
            type="submit"
            className="w-full mt-20 text-white"
          >
            {isLoading ? <ClipLoader color="#ffffff" /> : "Submit Request"}
          </Button>
          <ToastContainer />
        </div>
      </form>
    </Suspense>
  );
}
