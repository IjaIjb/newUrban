import React from "react";
import Modal from ".";
import { MdOutlineCelebration } from "react-icons/md";
import Button from "../button";

export default function SuccessModal({
  isOpen,
  setIsOpen,
  title,
  desc,
  customButton,
  onClose,
}: any) {
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} hideClose>
      <div className="flex flex-col items-center text-center">
        <MdOutlineCelebration size={84} className="text-primary" />
        <h2 className="text-lg font-medium mb-4 text-primary">{title}</h2>
        <p className="mb-4">{desc}</p>
        {customButton ?? (
          <Button
            type="button"
            className="w-full mt-10 text-white"
            onClick={closeModal}
            // disabled={!formik.values['userType'] ? true : undefined}
          >
            Continue
          </Button>
        )}
      </div>
    </Modal>
  );
}
