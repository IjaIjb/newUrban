import React, { use } from "react";
import Button from "../../button";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "../../input";

export default function TravellersManifest() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  const validationSchema = Yup.object().shape({
    passengers: Yup.array().of(
      Yup.object().shape({
        nextOfKIn: Yup.string().required("Next of kin is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      nextOfKIn: "",
      phoneNumber: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      localStorage.setItem("manifest-values", JSON.stringify(values));
      pushWithUserTypePrefix("/book-ride/preview");
    },
  });

  return (
    <div className="">
      <div className="text-center mb-10">
        <b className="text-primary text-center">Traveller&apos;s Manifest</b>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Next of kin"
          type="text"
          id="nextOfKIn"
          name="nextOfKIn"
          value={formik.values.nextOfKIn}
          onChange={formik.handleChange}
          containerStyle="mt-0 w-full"
          onBlur={formik.handleBlur}
          error={formik.touched.nextOfKIn && formik.errors.nextOfKIn}
        />
        <Input
          label="Phone number"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          containerStyle="mt-0 w-full mt-4"
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <Button type="submit" className="mt-10 ">
          Proceed
        </Button>
      </form>
    </div>
  );
}
