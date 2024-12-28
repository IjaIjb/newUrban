import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useAuth } from "@/common/hooks/useAuth";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import Dropdown from "@/app/components/dropdowns/dropdown";
import authOBJ from "@/common/classes/auth.class";
import parkOBJ from "@/common/classes/park.class";
import { useUser } from "@/common/hooks/useUser";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

export default function ManagerForm({ openModal }: { openModal: () => void }) {
  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];
  const userData = useUser();
  const [parks, setParks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  const formik = useFormik({
    initialValues: {
      dispatcherName: "",
      email: "",
      phoneNumber: "",
      fullAddress: "",
      password: "",
      parkId: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      dispatcherName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      parkId: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Invalid phone number")
        .required("Required")
        .max(11)
        .min(10),
      fullAddress: Yup.string().required("Required"),
      password: Yup.string()
        .matches(/[A-Z]/, "Password must contain at least one capital letter")
        .matches(
          /[a-zA-Z0-9]/,
          "Password must be alphanumeric and include at least one digit"
        )
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
        )
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values: any) => {
      setIsLoading(true);
      const data = {
        dispatcherName: values.dispatcherName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        deviceToken: "uefuefue23",
        password: values.password,
        retypePassword: values.confirmPassword,
        parkId: values.parkId,
      };
      authOBJ
        .register(data, "dispatchOfficer")
        .then((res: any) => {
          console.log(res, "data form dispatch");
          toast.success(res?.data.message);
          //redirect to park
          pushWithUserTypePrefix("/park");
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
          setIsLoading(false);
        });
    },
  });

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

  let option: { value: any; label: any }[];

  if (parks && parks?.length >= 1) {
    option = parks?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }));
  } else {
    option = [
      {
        value: null,
        label: "no Park found",
      },
    ];
  }

  const [selectedPark, setSelectedPark] = useState<any>();

  return (
    <div>
      <form className="mt-10 w-[510px]" onSubmit={formik.handleSubmit}>
        <Dropdown
          options={option}
          placeholder="Select Park"
          label="Select Park"
          value={formik.values.parkId}
          error={formik.touched.parkId && formik.errors.parkId}
          onSelect={(e: any) => formik.setFieldValue("parkId", e)}
          className="w-[510px]"
        />
        <Input
          label="Dispatcher Name"
          type="text"
          id="dispatcherName"
          name="dispatcherName"
          value={formik.values.dispatcherName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.dispatcherName && formik.errors.dispatcherName}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={(event) => {
            let phoneNumber = event.target.value.replace(/\D/g, "");
            phoneNumber = phoneNumber.slice(0, 11);
            formik.setFieldValue("phoneNumber", phoneNumber);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <Input
          label="Full Address"
          type="text"
          id="fullAddress"
          name="fullAddress"
          value={formik.values.fullAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullAddress && formik.errors.fullAddress}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button
          type="submit"
          className="w-full mt-10 text-white"
          //disabled={isLoading && formik.errors}
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Add Dispatch officer"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
