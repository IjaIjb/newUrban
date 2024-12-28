"use client";
import Header from "../../(components)/header";
import { RadioButton } from "@/app/components/radio/auth.radio";
import { useState } from "react";
import IndividualInput from "./input-fields/individual.inputs";
import CorporateInput from "./input-fields/corporate.inputs";

export default function ParkOwner() {
  const options = [
    { label: "Individual", value: "individual" },
    { label: "Corporate", value: "corporate" },
  ];

  const [userType, setUserType] = useState(options[0].value);
  // console.log(formik.values.userType)

  return (
    <div>
      <div>
        <Header
          heading="Sign Up as Park Owner"
          desc="Register in two easy steps"
          step={1}
        />
      </div>
      <div className="mt-6">
        <RadioButton
          name="userType"
          options={options}
          data={userType}
          onSelect={setUserType}
          className="grid grid-cols-2 w-full"
        />
      </div>
      {userType === "individual" ? <IndividualInput /> : <CorporateInput />}
    </div>
  );
}
