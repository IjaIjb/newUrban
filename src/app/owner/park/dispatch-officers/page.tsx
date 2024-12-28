"use client";
import SubHeader from "@/app/components/headers/sub-header";
import MainTable from "@/app/components/tables/main.table";
import dispatch from "@/common/classes/dispatch.class";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from "@/app/components/button";
import Modal from "@/app/components/modal";
import { Typography } from "@mui/material";
import { destroyCookie, setCookie } from "nookies";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface DispatchDataInterface {
  email: string;
  fullName: string;
  id: string;
  parkId: string;
  parkName: string;
  phoneNumber: string;
  userId: string;
}

export default function DispatchOfficers() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [modalForDelete, setModalForDelete] = useState<boolean>(false);
  const [selectedDispatchDetails, setSelectedDispatchDetails] =
    useState<DispatchDataInterface | null>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [dispatchData, setDispatchData] = useState<any[]>([]);
  const { authUser: userData, userAuthType: userType } = useSelector(
    (a: any) => a?.authUser
  );
  console.log("🚀 ~ DispatchOfficers ~ userData:", { userData, userType });

  const getAllDispatchOfficers = async () => {};
  const columns = [
    {
      key: "fullName",
      header: "Dispatch Name",
    },
    {
      key: "parkName",
      header: "Park Name",
    },
    {
      key: "email",
      header: "Email Address",
    },
    {
      key: "phoneNumber",
      header: "Phone No",
    },
    {
      key: "actions",
      header: "Action",
    },
  ];
  //edit,view statement, reset password , delete
  const actionObject = [
    {
      label: "Edit",
      function: (row: DispatchDataInterface) => {
        const editParkData: string = JSON.stringify(row);
        destroyCookie(null, "editDispatch");
        //create new cookie
        setCookie(null, "editDispatch", editParkData, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        pushWithUserTypePrefix(`park/dispatch-officers/edit`);
      },
    },
    {
      label: "View Statement",
      function: (row: any) => {
        // Perform edit action using the 'row' data

        const query = new URLSearchParams({
          id: row.id,
        }).toString();
        pushWithUserTypePrefix(
          // park-statements/dispatcher/20cbc2ad-8285-41f3-a9fd-6ef0eeddda5b
          `/park-statements/dispatcher/${row?.id}`
        );
        console.log("View Statement action clicked for row:", row);
      },
    },
    {
      label: "Reset Password",
      function: (row: DispatchDataInterface) => {
        const restParkData: string = JSON.stringify(row);
        //clear any cookies before creating a new one
        destroyCookie(null, "resetPasswordDispatch");
        //create new cookie
        setCookie(null, "resetPasswordDispatch", restParkData, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        pushWithUserTypePrefix(`park/dispatch-officers/reset-password`);
      },
    },
    {
      label: "Delete",
      function: (row: DispatchDataInterface) => {
        console.log("rowrow", row);
        setSelectedDispatchDetails(row);
        setModalForDelete(true);
        // Perform edit action using the 'row' data
      },
    },
  ];
  useEffect(() => {
    dispatch.getAllCreated().then((res) => {
      if (res.length >= 1) {
        const newRes = res.map((a: any) => {
          return {
            fullName: a?.fullName,
            userId: a?.userId,
            id: a?.id,
            parkName: a?.park.name,
            email: a?.user?.email,
            phoneNumber: a?.user?.phoneNumber,
            parkId: a?.park?.id,
          };
        });
        setDispatchRider(newRes);
        setDispatchData(newRes);
      }
    });
  }, []);
  const SearchRider = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = dispatchData?.filter((parkfiltername: any) =>
        parkfiltername?.fullName.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setDispatchRider(searchFilter);
    } else {
      setDispatchRider(dispatchData);
    }
  };
  const deleteDispatchRider = (id: string) => {
    setisLoading(true);
    console.log("is from dipatch to be deleted", id);
    dispatch
      .delete(id)
      .then((res: any) => {
        console.log("response from delete dispatch rider", res);
        setisLoading(false);
        setOpenAlert(true);
        setModalForDelete(false);
        toast.success("Dispatch Ride sucessfully deleted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        const filpark = DispactchRider.filter(
          (park: DispatchDataInterface) =>
            park?.id !== selectedDispatchDetails?.id
        );
        setDispatchData(filpark);
        setDispatchRider(filpark);
      })
      .catch((error: any) => {
        setisLoading(false);
        setModalForDelete(false);
        setOpenAlert(true);
        toast.error("An error occur when deleting Dispatch rider", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        console.log("responseerr from delete park manager", error);
      });
  };
  return (
    <Suspense>
      <SubHeader header="Dispatch Officers" />
      <ToastContainer />
      <Modal
        isOpen={modalForDelete}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <div>
          <div>
            <Typography
              style={{
                fontSize: "16px",
                fontWeight: 700,
              }}
              className="text-center text-[16px] font-[700]"
            >
              Are you sure ?
            </Typography>
            <Typography className="text-center text-[14px] font-[400]">
              This action cannot be undone.
              <br /> you would be removing this dispatch rider from your park
            </Typography>
          </div>
          <div className="flex justify-between py-4 gap-2">
            <Button
              style={"outline"}
              onClick={() => setModalForDelete(false)}
              className=" w-full"
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                selectedDispatchDetails?.id &&
                  deleteDispatchRider(selectedDispatchDetails.id);
              }}
              style={"danger"}
              className="text-white w-full"
              type="button"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <div className="mt-[53px]">
        <MainTable
          columns={columns}
          data={DispactchRider}
          identifier=""
          actionObject={actionObject}
          searchBy="Dispatch name"
          handleSearch={(e: any) => {
            SearchRider(e);
          }}
          handleFilter={(e: any) => {}}
          apiSearch={() => {}}
        />
      </div>
    </Suspense>
  );
}
