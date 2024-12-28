"use client";

import Accordion from "@/app/components/Accordion";
import PassengerForm from "@/app/components/booking/PassengerForm";
import PassengerFormTitle from "@/app/components/booking/PassengerFormTitle";
import TravellersManifest from "@/app/components/booking/modals/TravellersManifest";
import Button from "@/app/components/button";
import SubHeader from "@/app/components/headers/sub-header";
import Modal from "@/app/components/modal";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormValues {
  title: string;
  firstName: string;
  email: string;
  surname: string;
  phoneNumber: string;
  seat: string;
  extraLuggage: number;
}

export default function PassengerDetails() {
  const [bookData, setBookData] = useState<any>(null);
  const [tripData, setTripData] = useState<any>(null);
  const [passengers, setPassengers] = useState<FormValues[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bookDataString: any = localStorage.getItem("book-ride-values");
      const tripDataString: any = localStorage.getItem("selected-trip-values");

      const bookData = JSON.parse(bookDataString);
      const tripData = JSON.parse(tripDataString);

      setBookData(bookData);
      setTripData(tripData);
    }
  }, []);

  useEffect(() => {
    if (bookData) {
      const initialPassengers = Array.from(
        { length: bookData.noOfPassanger || 1 },
        () => ({
          title: "",
          email: "",
          firstName: "",
          surname: "",
          phoneNumber: "",
          seat: "",
          extraLuggage: 0,
        })
      );
      setPassengers(initialPassengers);
    }
  }, [bookData]);

  const validationSchema = Yup.object().shape({
    passengers: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        email: Yup.string().email().required("Email is required"),
        firstName: Yup.string().required("First Name is required"),
        surname: Yup.string().required("Surname is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        seat: Yup.string().required("Seat is required"),
        extraLuggage: Yup.number(),
      })
    ),
  });

  const formik = useFormik({
    initialValues: { passengers },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values);
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "passenger-details-values",
          JSON.stringify(values)
        );
      }
      setOpen(true);
    },
  });

  if (!bookData || !tripData) {
    return <div>Loading...</div>;
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <SubHeader header="Enter Passenger’s Details" hideRight />
      <div className="w-1/2 mt-8">
        <form onSubmit={formik.handleSubmit}>
          <Accordion
            items={passengers.map((_, index) => ({
              title: (
                <PassengerFormTitle
                  index={index + 1}
                  name={
                    formik.values.passengers[index]?.title +
                    " " +
                    formik.values.passengers[index]?.firstName +
                    " " +
                    formik.values.passengers[index]?.surname
                  }
                  seat={formik.values.passengers[index]?.seat}
                />
              ),
              content: (
                <PassengerForm
                  formik={formik}
                  index={index}
                  tripId={tripData.id}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                  ]}
                />
              ),
            }))}
          />
          <Button type="submit" className="mt-10 w-full">
            Submit
          </Button>
        </form>
      </div>
      <Modal
        isOpen={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TravellersManifest />
      </Modal>
    </div>
  );
}
