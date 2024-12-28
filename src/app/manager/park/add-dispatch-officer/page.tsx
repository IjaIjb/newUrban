"use client";
import SubHeader from "@/app/components/headers/sub-header";
import SuccessModal from "@/app/components/modal/sucess-modal";
import React, { useState } from "react";
import OwnerForm from "./(comp)/ownerForm";
import ManagerForm from "./(comp)/managerForm";
import { parseCookies } from "nookies";
import { GetUserType } from "@/common/hooks/token";
import { useSelector } from "react-redux";

export default function AddDispatchOfficer() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const [selectedPark, setSelectedPark] = useState();
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);
  console.log(userType, "user type");

  return (
    <div>
      <SubHeader header="Add Dispatch Officer" hideRight />
      {userType === "parkOwner" ? (
        <OwnerForm openModal={openModal} />
      ) : (
        userType === "parkManager" && <ManagerForm openModal={openModal} />
      )}
      <SuccessModal
        title="Dispatcher Added"
        desc="You have successfully added a Dispatch Officer."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
