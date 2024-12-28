"use client";
import SubHeader from "@/app/components/headers/sub-header";
import { useFormik } from "formik";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

import Input from "@/app/components/input";
import { AiOutlineUser, AiOutlineCreditCard } from "react-icons/ai";
import Button from "@/app/components/button";
import SuccessModal from "@/app/components/modal/sucess-modal";
import { useState } from "react";

// const renderPage = (type: string) => {
//     switch (type) {
//         // case 'park-owner':
//         //     return <ParkOwner />
//         // case 'park-manager':
//         //     return <ParkManager />
//         // case 'dispatch-officer':
//         //     return <DispatchOfficer />
//         // default:
//         //     return <ParkOwner />
//     }
// }

export default function Channel({ params }: any) {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      date: "",
      cvv: "",
    },
    onSubmit: (values) => {
      openModal();
      // pushWithUserTypePrefix(`/`)
    },
  });
  return (
    <div>
      {/* {renderPage(params.userType)} */}
      <SubHeader header={`Pay with ${params.channel}`} hideRight />
      <form className="mt-10 w-1/2" onSubmit={formik.handleSubmit}>
        <Input
          placeholder="Name"
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          icon={<AiOutlineUser className="text-primary" />}
        />
        <Input
          placeholder="Card Number"
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cardNumber && formik.errors.cardNumber}
          icon={<AiOutlineCreditCard className="text-primary" />}
        />
        <div className="flex">
          <Input
            placeholder="Expiry Date"
            type="date"
            id="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            containerStyle="w-full mt-8"
            error={formik.touched.date && formik.errors.date}
            // icon={<LockClosedIcon />}
          />
          <Input
            placeholder="cvv"
            type="password"
            id="cvv"
            name="cvv"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            containerStyle="w-full ml-4 mt-8"
            error={formik.touched.cvv && formik.errors.cvv}
            // icon={<LockClosedIcon />}
          />
        </div>
        <Button type="submit" className="w-full mt-10 text-white">
          Pay
        </Button>
      </form>
      <SuccessModal
        title="Congratulations"
        desc={
          <p>
            Your Payment was successful. Your booking Code is{" "}
            <span className="text-primary font-bold">2334467464FA</span>
          </p>
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        customButton={
          <div>
            <Button
              type="submit"
              className="w-full mt-10 text-white"
              onClick={() =>
                pushWithUserTypePrefix("/book-ride/payment/receipt")
              }
            >
              See Receipt
            </Button>
            <Button type="submit" className="w-full mt-4" style="outline">
              Notify Passenger via Email
            </Button>
          </div>
        }
      />
    </div>
  );
}
