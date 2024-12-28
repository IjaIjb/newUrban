"use client";
import SubHeader from "@/app/components/headers/sub-header";
import Modal from "@/app/components/modal";
import DeleteModal from "@/app/components/modal/deleteModal";
import MainTable from "@/app/components/tables/main.table";
import driverRequestApi from "@/common/classes/driverRequest.class";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TrackReequest() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputField, setInputField] = useState<string>("");

  const [processedRequest, setprocessedRequest] = useState<any[]>([]);

  const [tripData, setTripData] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [modalForDelete, setModalForDelete] = useState<boolean>(false);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const getAllprocessedRequest = async () => {
    driverRequestApi.getOwnerDriverRequest().then((res) => {
      setprocessedRequest(res);
      setTripData(res);
    });
  };

  useEffect(() => {
    getAllprocessedRequest();
  }, []);

  const columns = [
    {
      key: "providerAgency",
      header: "Provider Agency",
    },
    {
      key: "tripCode",
      header: "Trip Code",
    },
    {
      key: "departureState",
      header: "From",
    },
    {
      key: "destinationState",
      header: "To",
    },
    {
      key: "departureTime",
      header: "Departure Time",
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "vehicleType",
      header: "Vehicle Type",
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "action",
      header: "Action",
    },
  ];

  const actionObject = [
    {
      label: "View Details",
      function: (a: any) => {
        setIsOpen(true);
        setSelectedRequest(a);
      },
    },
    {
      label: "Cancel",
      function: (row: any) => {
        setModalForDelete(true);
        console.log("selected manager", row, modalForDelete);
        setSelectedRequest(row);
      },
    },
  ];

  const handleDeleteRequest = () => {
    setisLoading(true);
    driverRequestApi
      .cancelRequest(selectedRequest?.id)
      .then((res) => {
        getAllprocessedRequest();
        setisLoading(false);
        setModalForDelete(false);
        toast.success("Request sucessfully deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        setisLoading(false);
        setModalForDelete(false);
        toast.error("An error occur when deleting Manager", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const Search = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = tripData?.filter((data: any) =>
        data?.providerAgency?.toLowerCase().includes(e.toLowerCase())
      );
      setprocessedRequest(searchFilter);
    } else {
      setprocessedRequest(tripData);
    }
  };

  return (
    <div>
      <SubHeader
        header="Track Request"
        inputText="Search Trips"
        setInputField={setInputField}
      />
      <div>
        <div className="mt-6">
          <MainTable
            columns={columns}
            data={processedRequest}
            identifier=""
            actionObject={actionObject}
            searchBy="Agency Name"
            handleSearch={(e: any) => {
              Search(e);
            }}
            handleFilter={(e: any) => {}}
            apiSearch={() => {}}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TripDetails data={selectedRequest} />
      </Modal>

      <DeleteModal
        isOpen={modalForDelete}
        isLoading={isLoading}
        onClose={() => setModalForDelete(false)}
        onDelete={handleDeleteRequest}
        title="Are you sure?"
        message="This action cannot be undone. You would be removing this request."
      />
    </div>
  );
}

const TripDetails = ({ data }: { data: any }) => {
  return (
    <div>
      <h3 className="text-xl text-primary font-bold mb-3">View Details</h3>

      <div className="grid grid-cols-2 gap-4">
        <p>Departure Park Name: </p>
        <p>{data?.park?.name}</p>
        <p>Departure Park Address: </p>
        <p>{data?.park?.fullAddress}</p>
        <p>Destination City: </p>
        <p>{data?.trip?.endCity}</p>
        {/* <p>Park Number: </p>
        <p>{data?.parkNumber}</p> */}
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <p>Provider Agency Name: </p>
        <p>{data?.providerAgency}</p>
        <p>Provider Agency Region: </p>
        <p>{data?.region}</p>
        {/* <p>Provider Agency Telephone Number: </p>
        <p>{data?.providerAgencyTelephoneNumber}</p> */}
        <p>Timestamp: </p>
        <p>{data?.tripCreatedAt}</p>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <p>Driver Name: </p>
        <p>{data?.driver?.fullName}</p>
        <p>Driver Phone Number: </p>
        <p>{data?.driver?.phoneNumber}</p>
      </div>
    </div>
  );
};
