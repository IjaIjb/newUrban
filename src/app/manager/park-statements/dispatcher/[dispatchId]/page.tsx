"use client";

import SubHeader from "@/app/components/headers/sub-header";
import { ManifestContent } from "@/app/components/ManifestContent";
import Modal from "@/app/components/modal";
import MainTable from "@/app/components/tables/main.table";
import { IBooking } from "@/app/dispatch/page";
import tripOBJs from "@/common/classes/trip.class";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { dispatchId: string } }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const name = searchParams?.get("name");

  const [bookingInfo, setBookInfo] = useState<IBooking[]>([]);
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const [currentbooking, setCurrentBooking] = useState<IBooking>();

  useEffect(() => {
    tripOBJs.getBooking({ id: params.dispatchId }).then((res: any) => {
      setBookInfo(res);
      setBookings(res);
    });
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
      <SubHeader header={`${name} Statements`} />
      <div className="mt-[53px]">
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
