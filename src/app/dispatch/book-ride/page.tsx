"use client";
import Dropdown from "@/app/components/dropdowns/dropdown";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Button from "../../components/button";
import Location from "../../components/custom svg/location";
import SubHeader from "../../components/headers/sub-header";
import Input from "../../components/input";
import { RadioButton } from "../../components/radio/auth.radio";

import { stateOptions } from "@/common/data/NigeriaData";
import { cn } from "@/common/helpers";

interface FormValues {
  selectedVehicle: string;
  destinationState: string;
  noOfPassanger: string;
  travelDate: string;
}

export default function BookRide() {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "minibus", label: "Mini bus" },
    { value: "sedan", label: "Sedan" },
  ];

  const { pushWithUserTypePrefix } = useUserTypeRouter();

  const validationSchema = Yup.object({
    selectedVehicle: Yup.string().required("Vehicle type is required"),
    destinationState: Yup.string().required("Destination city is required"),
    noOfPassanger: Yup.string().required("No of seat is required"),
    travelDate: Yup.date().required("Travel date is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      selectedVehicle: "",
      travelDate: "",
      destinationState: "",
      noOfPassanger: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      localStorage.setItem("book-ride-values", JSON.stringify(values));

      pushWithUserTypePrefix("/book-ride/continue-booking");
    },
  });

  return (
    <Suspense>
      <SubHeader header="Book Ride" hideRight hideBack />
      <form className="mt-10 w-[540px]" onSubmit={formik.handleSubmit}>
        <div className="flex">
          <Location />
          {/* <div className='w-full'> */}

          <div className=" flex-row h-full  justify-between">
            <Input
              label="Travel Date"
              type="date"
              id="travelDate"
              name="travelDate"
              value={formik.values.travelDate}
              onChange={(e) => {
                console.log("🚀 ~ BookRide ~ e:", e.target.value);
                formik.handleChange(e);
              }}
              containerStyle="mt-0 w-[97%] ml-4"
              onBlur={formik.handleBlur}
              error={formik.touched.travelDate && formik.errors.travelDate}
            />

            {/* </div> */}
            <div className="ml-4">
              <Dropdown
                options={stateOptions}
                placeholder="Option"
                label="Destination State"
                value={formik.values.destinationState}
                onSelect={(e: any) => {
                  formik.setFieldValue("destinationState", e);
                }}
                className={cn(
                  "w-[506px]",
                  formik.errors.destinationState && "border-red-600"
                )}
              />
            </div>
          </div>
        </div>

        <Input
          label="No of passanger"
          placeholder="select seat"
          type="number"
          id="noOfPassanger"
          name="noOfPassanger"
          value={formik.values.noOfPassanger}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.noOfPassanger && formik.errors.noOfPassanger}
        />

        <p className="mt-[53px] mb-2">Select Vehicle Type</p>
        <RadioButton
          name="selectedVehicle"
          options={options}
          data={formik.values.selectedVehicle}
          onSelect={(e) => formik.setFieldValue("selectedVehicle", e)}
          className="grid grid-cols-4 rounded-none gap-x-4 bg-white p-0 w-[540px]"
          customInputWrapperStyle="bg-gray-100 w-32 h-[105px] flex items-center justify-center rounded-xl"
          customActiveStyle="border border-2 border-primary"
        />
        {formik.touched.selectedVehicle && formik.errors.selectedVehicle && (
          <p className="mt- text-danger text-xs">
            {formik.errors.selectedVehicle}
          </p>
        )}

        <Button className="w-full mt-10 z-10 " type="submit">
          Book ride
        </Button>
      </form>

      <ToastContainer />
    </Suspense>
  );
}
