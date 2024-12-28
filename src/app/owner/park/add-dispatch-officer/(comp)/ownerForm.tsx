import Button from "@/app/components/button";
import Dropdown from "@/app/components/dropdowns/dropdown";
import Input from "@/app/components/input";
import { useAuth } from "@/common/hooks/useAuth";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import authOBJ from "@/common/classes/auth.class";
import parkOBJ from "@/common/classes/park.class";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
export default function OwnerForm({ openModal }: { openModal: () => void }) {
  const [selectedPark, setSelectedPark] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [parks, setParks] = useState<any[]>([]);
  const formik = useFormik({
    initialValues: {
      dispatcherName: "",
      email: "",
      phoneNumber: "",
      parkId: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      dispatcherName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      parkId: Yup.string().required("Required"),
      phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits")
        .required("Required")
        .max(11)
        .min(10),

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
        .required("Confirm password is required"),
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
      console.log(selectedPark, "data from the form");

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
  console.log("formik errors", formik.errors);
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
  const option =
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

  console.log(formik.errors, "form erros");
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
          // disabled={!formik.values['userType'] ? true : undefined}
        >
          {isLoading ? <ClipLoader color="#ffffff" /> : "Add Dispatch officer"}
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
}
