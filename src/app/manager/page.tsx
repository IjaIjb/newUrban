// import styles from './page.module.css'
"use client";

import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import CTA from "../components/dashboard/comp/cta";
import SubHeader from "../components/headers/sub-header";

import { BiCopy, BiMoney } from "react-icons/bi";
import { HiCheck } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import CarSideIcon from "../components/custom svg/car-side";
import InfoCard from "../components/dashboard/comp/infoCard";
// const inter = Inter({ subsets: ['latin'] })
import manager from "@/common/classes/manager.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ParkManager() {
  const userData = useSelector(selectAuthUser);

  const [managerDetails, setManagerDetails]: any = useState();

  const urbanId = managerDetails?.parkManager?.urbanId;

  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(urbanId);
        toast.success("Copied to clipboard");
      } catch (err) {
        toast.error("Failed to copy");
      }
    } else {
      toast.error("Clipboard API not supported or not secure context");
    }
  };

  useEffect(() => {
    manager
      .getManagerDashboarddata()
      .then((res) => {
        setManagerDetails(res);
        console.log("this is the response from the appia", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copySuccess]);

  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();

  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader header="Dashboard" hideBack hideRight />
      <div className="mt-4 flex justify-between">
        <div className="flex-col gap-4">
          <div className="flex text-sm items-center">
            <p>Park Name: </p>
            <p className="text-lg ml-2 capitalize">
              {userData?.park?.name || "No Park"}
            </p>
          </div>
          <div className="flex text-sm items-center">
            <p>Manager Name: </p>
            <p className="text-lg ml-2  capitalize">
              {(userData?.firstName || "") + " " + (userData?.lastName || "")}
            </p>
          </div>
        </div>
        <div className="flex text-sm justify-center items-center">
          <p>Manager ID:</p>
          <p className="text-primary ml-2 text-lg ">{urbanId}</p>
          <button className="" onClick={handleCopyClick}>
            <BiCopy className="ml-1 text-lg" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-[32px] gap-8">
        <div className="col-span-1 ">
          <CTA
            text="View park Statement"
            type="green"
            onClick={() => pushWithUserTypePrefix("/park-statements")}
          />
        </div>
      </div>

      <div className="mt-[53px] grid grid-cols-3 gap-8">
        <InfoCard
          title="Total Trips Set"
          num={managerDetails?.totalTrips}
          icon={() => <CarSideIcon color="stroke-white" size={"16"} />}
        />
        <InfoCard
          title="Successful Trips"
          num={managerDetails?.successfullTrip}
          icon={() => <HiCheck color="white" />}
        />
        <InfoCard
          title="Cancelled Trips"
          num={managerDetails?.cancelledTrip}
          icon={() => <IoMdClose color="white" />}
        />
        <InfoCard
          title="Scheduled Trips"
          num={managerDetails?.scheduledTrips}
          icon={() => <BiMoney color="white" />}
        />
      </div>
    </div>
  );
}
