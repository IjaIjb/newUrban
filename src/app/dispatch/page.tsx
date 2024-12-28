"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import CTA from "../components/dashboard/comp/cta";
import DataCard from "../components/dashboard/comp/dataCard";
import SubHeader from "../components/headers/sub-header";

import { routes } from "@/common/routes";
// const inter = Inter({ subsets: ['latin'] })
import tripOBJs from "@/common/classes/trip.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { ManifestContent } from "../components/ManifestContent";
import Modal from "../components/modal";
import MainTable from "../components/tables/main.table";

export interface IBooking {
  bookingCode: string;
  date: string;
  passengerEmail: string;
  passengerName: string;
  status: string;
  departurePark: string;
  destinationCity: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
  trip: any;
}

export default function DispatchOfficer() {
  const user = useAppSelector(selectAuthUser)!;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [bookingInfo, setBookInfo] = useState<IBooking[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [currentbooking, setCurrentBooking] = useState<IBooking>();

  const { pushWithUserTypePrefix } = useUserTypeRouter();
  useEffect(() => {
    // authOBJ.currentUser().then((res) => {
    tripOBJs
      .getBooking({ id: user?.park?.id!, byPark: true })
      .then((res: any) => {
        setBookInfo(res);
        setBookings(res);
      });
    // });
  }, []);

  const columns = [
    {
      key: "passengerName",
      header: "Passenger Name",
    },
    {
      key: "passengerEmail",
      header: "Passenger Email",
    },
    {
      key: "passengerPhone",
      header: "Passenger Phone",
    },
    {
      key: "bookingCode",
      header: "Booking Code",
    },
    {
      key: "date",
      header: "Depature Date",
    },
    {
      key: "status",
      header: "Payment Status",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];

  const SearchBooking = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = bookingInfo?.filter((parkfiltername: IBooking) =>
        parkfiltername?.passengerName.toLowerCase().includes(e.toLowerCase())
      );
      setBookings(searchFilter as any);
    } else {
      setBookings(bookingInfo);
    }
  };

  const actionObject = [
    {
      label: "Open Ticket",
      function: (row: any) => {},
    },
    {
      label: "View Manifest",
      function: (row: IBooking) => {
        setIsOpen(true);
        setCurrentBooking(row);
      },
    },
    {
      label: "Download Receipt",
      function: (row: any) => {},
    },
  ];

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader header="Dashboard" hideBack />
      <p className="text-sm mt-4">
        Park Name:{" "}
        <span className="text-lg capitalize">{user?.park?.name}</span>
      </p>
      <DataCard title="Total Booking" amount="345,000" percentage="20%" />

      <div className="grid grid-cols-3 gap-3 mt-[32px]">
        <CTA
          text="Book a Ride"
          type="green"
          onClick={() =>
            pushWithUserTypePrefix(routes.dispatchOfficer.book_ride.path)
          }
        />
        <CTA
          text="Check Customer Booking"
          type="blue"
          onClick={() => pushWithUserTypePrefix("/customer-booking")}
        />
        <CTA
          text="View Open Tickets"
          type="gray"
          onClick={() => pushWithUserTypePrefix("/customer-booking")}
        />
      </div>

      <div className="mt-[53px]">
        {/* <Table
          columns={columns}
          data={data}
          action={{ viewLabel: "View Receipt", type: ["view"] }}
          path="/book-ride/payment/receipt"
        /> */}
        <MainTable
          columns={columns}
          data={bookings}
          identifier=""
          searchBy="passanger name"
          handleSearch={(e: IBooking) => SearchBooking(e)}
          handleFilter={(e: any) => {}}
          apiSearch={() => {}}
          hideExport
          actionObject={actionObject}
        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ManifestContent booking={currentbooking!} />
      </Modal>
    </div>
  );
}
