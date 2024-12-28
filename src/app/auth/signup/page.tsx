"use client";
import Button from "@/app/components/button";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { RadioSelect } from "@/app/components/radio/select.radio";
import { routes } from "@/common/routes";
import Header from "./(components)/header";

// const inter = Inter({ subsets: ['latin'] })

interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

const validationSchema = Yup.object({
  emailOrUsername: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const options = [
    { label: "Park Owner", value: "parkOwner" },
    { label: "Park Manager", value: "parkManager" },
    // { label: "Dispatch Officer", value: "DispatchOfficer" },
  ];

  const formik = useFormik({
    initialValues: {
      userType: "",
    },
    onSubmit: (values) => {
      router.push(
        values.userType === "parkOwner"
          ? routes.PARK_OWNER.path
          : values.userType === "parkManager"
          ? routes.PARK_MANAGER.path
          : routes.DISPATCH_OFFICER.path
      );
      // alert(JSON.stringify(values, null, 2))
    },
  });

  return (
    <div>
      {/* <RadioButton /> */}
      <div className="">
        {/* <button onClick={handleGoBack} className='flex items-center'>
					<ChevronLeftIcon className='h-5 w-5 mr-2' />
				</button>
				<h1 className='text-dark mt-2 font-bold text-3xl'>Register as</h1>
				<p className='text-dark text-2xl font-creato'>
					Please select any of the options below
				</p> */}
        <Header
          heading="Register as"
          desc="Please select any of the options below"
        />
        <form className="mt-10" onSubmit={formik.handleSubmit}>
          <div className="">
            <RadioSelect name="userType" formik={formik} options={options} />
          </div>
          <Button
            type="submit"
            className="w-full text-white mt-4"
            disabled={!formik.values["userType"] ? true : undefined}
          >
            Proceed
          </Button>
        </form>
      </div>
      {/* <p className='text-3xl font-bold underline'>
				Get started by editing&nbsp;
				<code className=''>src/app/page.tsx</code>
			</p> */}
    </div>
  );
}
