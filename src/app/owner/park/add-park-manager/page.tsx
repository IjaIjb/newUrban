"use client";
import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import SubHeader from "@/app/components/headers/sub-header";
import Input from "@/app/components/input";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useUser } from "@/common/hooks/useUser";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import parkOBJ from "@/common/classes/park.class";
import * as Yup from "yup";

import { ClipLoader } from "react-spinners";
export default function AddParkManager() {
  const userData = useUser();
  const [parks, setParks] = useState<any[]>([]);
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAllByUser();
      console.log("park ress::", res);
      const parks: any[] = [];
      setParks(res?.parks);
      // setMainParks(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllParks();
  }, []);
  const options =
    parks &&
    parks.map((park) => {
      if (park) {
        return {
          value: park.id,
          label: park.name,
        };
      } else {
        return {
          value: "",
          label: "no Park found",
        };
      }
    });

  const [isOpen, setIsOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    parkManagerId: Yup.string().required("Park Manager id is required"),
    parkId: Yup.string().required("Park id is required"),
  });

  const formik = useFormik({
    initialValues: {
      parkManagerId: "",
      parkId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      setIsLoading(true);
      // pushWithUserTypePrefix(routes.ADD_PARK.path)
      console.log(values.parkManagerId, "selectedparkId");
      parkOBJ
        .parkManager({
          parkId: values.parkId,
          parkManagerId: values.parkManagerId,
        })
        .then((res: any) => {
          toast.success(res?.data.message);
          //redirect to dashboard
          pushWithUserTypePrefix("/park");
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });
  {
    formik.errors, "error form";
  }
  return (
    <div>
      <SubHeader header="Add Park Manager" hideRight />
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Input
          label="Park Manager Id"
          type="text"
          id="parkManagerId"
          name="parkManagerId"
          value={formik.values.parkManagerId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.parkManagerId && formik.errors.parkManagerId}
        />
        <Dropdown
          options={options}
          placeholder="Select Park"
          label="Select Park"
          value={formik.values.parkId}
          error={formik.errors.parkId}
          onSelect={(e: any) => formik.setFieldValue("parkId", e)}
          className="w-[510px]"
        />
        <Button type="submit" className="w-full mt-10 text-white">
          {isLoading ? <ClipLoader color="#ffffff" /> : "Add Manager"}
        </Button>
      </form>
      <SuccessModal
        title="Manager Added"
        desc="You have successfully added a new park manager."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => pushWithUserTypePrefix("/")}
      />
      <ToastContainer />
    </div>
  );
}
