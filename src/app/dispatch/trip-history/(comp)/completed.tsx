import { ManifestContent } from "@/app/components/ManifestContent";
import Modal from "@/app/components/modal";
import MainTable from "@/app/components/tables/main.table";
import { useEffect, useState } from "react";
import { IBooking } from "../../page";

export default function CompletedTrips({ data }: any) {
  const [bookingInfo, setBookingInfo] = useState<IBooking>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const [Data, setData] = useState<any[]>([]);
  const [trip, setTrip] = useState<any[]>([]);

  useEffect(() => {
    setData(data);
    setTrip(data);
  }, [data]);
  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = Data?.filter((parkfiltername: any) =>
        parkfiltername?.tripCode.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setTrip(searchFilter);
    } else {
      setTrip(Data);
    }
  };

  const actionObject = [
    {
      label: "View Manifest",
      function: (row: IBooking) => {
        setBookingInfo(row);
        console.log("🚀 ~ DispatchOfficer ~ row:", row);
        setIsOpen(true);
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
    <>
      <div className="mt-[53px]">
        <MainTable
          columns={columns}
          data={trip}
          identifier=""
          hideExport
          searchBy="Booking code"
          handleSearch={(e: any) => {
            Search(e);
          }}
          actionObject={actionObject}
          handleFilter={(e: any) => {}}
          apiSearch={() => {}}
        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ManifestContent booking={bookingInfo!} />
      </Modal>
    </>
  );
}
