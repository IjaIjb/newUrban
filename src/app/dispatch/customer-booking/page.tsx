"use client";

import { ManifestContent } from "@/app/components/ManifestContent";
import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import Modal from "@/app/components/modal";
import MainTable from "@/app/components/tables/main.table";
import tripOBJs from "@/common/classes/trip.class";
import { useFormik } from "formik";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { IBooking } from "../page";

interface FormValues {
  bookingCode: string;
}

export default function CustomerBooking() {
  const [bookingInfo, setBookingInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const columns = [
    {
      key: "passengerName",
      header: "Passenger Name",
    },
    {
      key: "passengerEmail",
      header: "Passenger Email",
    },
    {
      key: "passengerPhone",
      header: "Passenger Phone",
    },
    {
      key: "bookingCode",
      header: "Booking Code",
    },
    {
      key: "date",
      header: "Depature Date",
    },
    {
      key: "status",
      header: "Payment Status",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];

  const data = [
    bookingInfo && {
      ...bookingInfo,
    },
  ];

  const actionObject = [
    {
      label: "Add Luggage",
      function: (row: any) => {},
    },
    {
      label: "Open Ticket",
      function: (row: any) => {},
    },
    {
      label: "View Manifest",
      function: (row: IBooking) => {
        console.log("🚀 ~ DispatchOfficer ~ row:", row);
        setIsOpen(true);
      },
    },
    {
      label: "Download Receipt",
      function: (row: any) => {},
    },
  ];

  const validationSchema = Yup.object({
    bookingCode: Yup.string().required("Booking Code is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      bookingCode: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);

      tripOBJs
        .getBookingByCode(values.bookingCode)
        .then((res) => {
          const booking = res;

          const transformedData = {
            passengerName: booking.passenger.name,
            passengerEmail: booking.passenger.email,
            passengerPhone: "+234" + booking.passenger.number,
            bookingCode: booking.bookingCode,
            status: booking.status,
            date: booking?.travelDate?.split("GMT")[0],
            ...booking,
          };

          setBookingInfo(transformedData);

          console.log(res, "trip booking");
          // setTripInfo((prevTripInfo: any) => ({
          //   ...prevTripInfo,
          //   bookingTime: new Date(),
          // }));
          setIsLoading(false);
          console.log(res.data.data, "res data");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          console.log(error);
          setIsLoading(false);
          // toast.error("Something went wrong");
          // setIsLoading(false);
        });
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-full">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader
        header="Check Customer Booking"
        vertical
        inputContainerStyle="mt-10"
        inputStyle="w-[711px]"
        inputText="2334467464FA"
        showButton
        buttonText="Fetch"
      />
      <form className="mt-10 w-1/2 flex " onSubmit={formik.handleSubmit}>
        <Input
          label=""
          type="text"
          id="search"
          name="bookingCode"
          placeholder="2562GYJUFD"
          value={formik.values.bookingCode}
          onChange={formik.handleChange}
          containerStyle="mt-0 w-full ml-4"
          onBlur={formik.handleBlur}
          error={formik.touched.bookingCode && formik.errors.bookingCode}
        />
        <Button className="ml-3" type="submit">
          {isLoading ? <ClipLoader color="#ffffff" /> : "Check"}
        </Button>
      </form>
      <div className="mt-[53px] h-full">
        {/* <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Receipt", type: ["view"] }}
        /> */}
        {bookingInfo && (
          <MainTable
            hideSearch
            columns={columns}
            data={data}
            identifier=""
            hideExport
            searchBy="Booking code"
            actionObject={actionObject}
            handleSearch={(e: any) => {
              null;
            }}
            handleFilter={(e: any) => {
              null;
            }}
            apiSearch={() => {}}
          />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ManifestContent booking={bookingInfo!} />
      </Modal>
    </div>
  );
}
