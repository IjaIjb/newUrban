"use client";
import Button from "@/app/components/button";
import SuccessModal from "@/app/components/modal/sucess-modal";
import tripOBJs from "@/common/classes/trip.class";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubHeader from "../../../../components/headers/sub-header";

export default function PaymentInfo() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<any>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const reference = searchParams?.get("reference");
  const paymentStatus = searchParams?.get("status");

  console.log("🚀 ~ PaymentInfo ~ reference:", reference);

  const parts = pathname?.split("/");

  const bookingCode = parts && decodeURIComponent(parts[3]);

  const TOTALFEES = +bookingInfo?.trip?.fare + +bookingInfo?.trip?.fare * 0.075;
  // console.log("🚀 ~ PaymentInfo ~ TOTALFEES:", TOTALFEES);

  //const [TripInfo,setTripInfo] = useState<any>()
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (paymentStatus && paymentStatus === "success") {
      openModal();
    }
  }, [paymentStatus]);

  //paystack
  const name: string | undefined = bookingInfo && bookingInfo.passenger.name;
  const config: {
    reference: string;
    email: string;
    amount: number;
    publicKey: any;
    firstname: string;
    lastname: string;
  } = {
    reference: reference!,
    email: bookingInfo?.passenger?.user?.email,
    amount: bookingInfo?.trip?.fare ? Number(TOTALFEES * 100) : 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK,
    firstname: name ? `${name.split(" ")[0]}` : "",
    lastname: name && name.split(" ").length > 1 ? `${name.split(" ")[1]}` : "",
  };

  // console.log("🚀 ~ PaymentInfo ~ values:", values);

  const onSuccess = (data: any) => {
    console.log("🚀 ~ onSuccess ~ reference:", data);
    pushWithUserTypePrefix(
      `/book-ride/${bookingInfo?.bookingCode}/payment?reference=${reference}&status=${data?.status}`
    );
  };

  const getBooking = () => {
    setIsLoading(true);

    tripOBJs
      .getBookingByCode(bookingCode!)
      .then((res) => {
        setBookingInfo(res);

        console.log(res, "trip booking");
        // setTripInfo((prevTripInfo: any) => ({
        //   ...prevTripInfo,
        //   bookingTime: new Date(),
        // }));
        setIsLoading(false);
        console.log(res.data.data, "res data");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        console.log(error);
        setIsLoading(false);
        // toast.error("Something went wrong");
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    getBooking();
  }, []);

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  // const componentProps = {
  //   ...config,
  //   text: `${
  //     isLoading
  //       ? "Processing payment"
  //       : `Proceed to Pay ${toIntlCurrency(TOTALFEES.toString())}`
  //   }`,
  //   onSuccess,
  //   onClose,
  // };

  const initializePayment = usePaystackPayment(config);

  return (
    <Suspense>
      <SubHeader header="Payment Info" hideRight />
      <div className="w-1/2">
        <div className="mt-6 ">
          <p className="text-sm">
            You are about to make the payment of{" "}
            <span className="text-primary">
              {/* {toIntlCurrency(TOTALFEES.toString())}. */}
            </span>
            Select payment option below
          </p>

          <>
            <Button
              onClick={() =>
                bookingInfo && initializePayment(onSuccess as any, onClose)
              }
              type="button"
              style="outline"
              className="w-full flex justify-between items-center mt-4 border-gray-200 border font-semibold rounded-[10px] px-4 h-[54px]"
            >
              <p className="text-sm text-black font-normal">Pay with</p>
              <Image
                src="/img/logos/paystack.png"
                alt="paystack logo"
                width={94}
                height={27}
                priority
              />
            </Button>
            <Button
              onClick={() => initializePayment(onClose)}
              type="button"
              style="outline"
              className="w-full flex justify-between items-center mt-4 border-gray-200 border font-semibold rounded-[10px] px-4 h-[54px]"
            >
              <p className="text-sm text-black font-normal">Pay with</p>
              <Image
                src="/img/logos/rave.png"
                alt="urban logo"
                width={64}
                height={27}
                priority
              />
            </Button>
          </>

          <SuccessModal
            title="Congratulations"
            desc={
              <p>
                Your Payment was successful. Your booking Code is{" "}
                <span className="text-primary font-bold">
                  {bookingInfo && bookingInfo?.bookingCode}
                </span>
              </p>
            }
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            customButton={
              <div>
                <Button
                  type="button"
                  className="w-full mt-10 text-white"
                  onClick={() => {
                    const url = `/book-ride/${bookingInfo?.bookingCode}/payment/receipt`;
                    // Push the data to the other page
                    pushWithUserTypePrefix(url);
                  }}
                >
                  See Receipt
                </Button>
                <Button type="button" className="w-full mt-4" style="outline">
                  Notify Passenger via Email
                </Button>
              </div>
            }
          />
          <ToastContainer />
        </div>
      </div>
    </Suspense>
  );
}
