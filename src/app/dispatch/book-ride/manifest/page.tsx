"use client";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { Suspense, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

import { encodeDecodeBase64 } from "@/common/utils";
import * as Yup from "yup";
export default function Manifest() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [TripInfo, setTripInfo] = useState<any>([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Convert the searchParams to a plain object
    let params: any = {};
    searchParams.forEach((value, key) => {
      let encodedValue: any = encodeDecodeBase64(key, "decode");
      encodedValue = JSON.parse(encodedValue);
      params = encodedValue;
    });
    setTripInfo(params);
  }, []);
  const validationSchema = Yup.object().shape({
    depatureCity: Yup.string(),
    destinationCity: Yup.string(),
    passengerName: Yup.string(),
    passengerNoK: Yup.string().required(" next of kin is required"),
    nokPhoneNumber: Yup.number()
      .required("NOK phone number is required")
      .min(10),
  });

  const formik = useFormik({
    initialValues: {
      depatureCity: TripInfo?.startLocation || "",
      destinationCity: TripInfo?.endLocation || "",
      passengerName: TripInfo?.passengerName || "",
      passengerNoK: "",
      nokPhoneNumber: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      setTripInfo((prevTripInfo: any) => ({
        ...prevTripInfo,
        nextOfKinPhone: values.nokPhoneNumber,
        nextOfKinName: values.passengerNoK,
      }));
      let encodedValue = encodeDecodeBase64(JSON.stringify(TripInfo), "encode");
      console.log(encodedValue, "encoded value");
      const queryParams = new URLSearchParams(encodedValue).toString();
      const url = `/book-ride/payment?${queryParams}`;
      // Push the data to the other page
      pushWithUserTypePrefix(url);
      //   pushWithUserTypePrefix("/book-ride/payment");
      //   alert(JSON.stringify(values, null, 2));
      // openModal()0
    },
  });
  console.log(formik.errors, "form error");
  return (
    <Suspense>
      <form onSubmit={formik.handleSubmit} className="">
        <div className={`flex items-center`}>
          <MdArrowBack
            className="cursor-pointer"
            onClick={() => window.history.back()}
            size={24}
          />
          <p className="text-xl font-bold ml-2">Manifest</p>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3">
          <Input
            label="Depature City"
            type="text"
            id="depatureCity"
            name="depatureCity"
            value={TripInfo?.startLocation || formik.values.depatureCity}
            onChange={formik.handleChange}
            containerStyle="mt-0"
            onBlur={formik.handleBlur}
            error={formik.touched.depatureCity && formik.errors.depatureCity}
          />
          <Input
            label="Destination City"
            type="text"
            id="destinationCity"
            name="destinationCity"
            value={TripInfo?.endLocation || formik.values.destinationCity}
            onChange={formik.handleChange}
            containerStyle="mt-0"
            onBlur={formik.handleBlur}
            error={
              formik.touched.destinationCity && formik.errors.destinationCity
            }
          />
          <Input
            label="Passenger Name"
            type="text"
            id="passengerName"
            name="passengerName"
            value={TripInfo?.passengerName || formik.values.passengerName}
            onChange={formik.handleChange}
            containerStyle="mt-0"
            onBlur={formik.handleBlur}
            error={formik.touched.passengerName && formik.errors.passengerName}
          />
          <Input
            label={`passenger's Next of Kin`}
            type="text"
            id="passengerNoK"
            name="passengerNoK"
            value={formik.values.passengerNoK}
            onChange={formik.handleChange}
            containerStyle="mt-0"
            onBlur={formik.handleBlur}
            error={formik.touched.passengerNoK && formik.errors.passengerNoK}
          />
          <Input
            label="Next of Kin Phone Number"
            type="text"
            id="nokPhoneNumber"
            name="nokPhoneNumber"
            value={formik.values.nokPhoneNumber}
            onChange={(event) => {
              let phoneNumber = event.target.value.replace(/\D/g, "");
              phoneNumber = phoneNumber.slice(0, 11);
              formik.setFieldValue("nokPhoneNumber", phoneNumber);
            }}
            containerStyle="mt-0"
            onBlur={formik.handleBlur}
            error={
              formik.touched.nokPhoneNumber && formik.errors.nokPhoneNumber
            }
          />

          <Button type="submit" className="w-full mt-10 text-white">
            Proceed to pay ₦{TripInfo?.fare}
          </Button>
        </div>
      </form>
    </Suspense>
  );
}
