"use client";
import SubHeader from "@/app/components/headers/sub-header";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import OwnerForm from "./(comp)/ownerForm";

export default function AddDispatchOfficer() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

  // const [selectedPark, setSelectedPark] = useState();
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);
  console.log(userType, "user type");

  return (
    <div>
      <SubHeader header="Add Dispatch Officer" hideRight />
      <OwnerForm openModal={openModal} />

      <SuccessModal
        title="Dispatcher Added"
        desc="You have successfully added a Dispatch Officer."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
