"use client";
import React, { useState, useEffect, Suspense } from "react";
import SubHeader from "@/app/components/headers/sub-header";
import dispatch from "@/common/classes/dispatch.class";
import MainTable from "@/app/components/tables/main.table";
import { useSelector } from "react-redux";
import { USER_TYPE } from "@/common/types";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

import { destroyCookie, setCookie } from "nookies";
import Modal from "@/app/components/modal";
import { Typography } from "@mui/material";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Button from "@/app/components/button";

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
        // Perform edit action using the 'row' data
        // Perform delete action using the 'row' data
        const editParkData: string = JSON.stringify(row);
        //clear any cookies before creating a new one
        destroyCookie(null, "editDispatch");
        //create new cookie
        setCookie(null, "editDispatch", editParkData, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        pushWithUserTypePrefix(`edit`);
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
          `/park-statements/manager/${row?.fullName}/records?${row?.id}`
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
        pushWithUserTypePrefix(`reset-password`);
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
        children={
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
                children="Cancle"
                type="button"
              />
              <Button
                onClick={() => {
                  selectedDispatchDetails?.id &&
                    deleteDispatchRider(selectedDispatchDetails.id);
                }}
                style={"danger"}
                className="text-white w-full"
                children="Delete"
                type="button"
              />
            </div>
          </div>
        }
      />
      {/* <div className='grid grid-cols-3 gap-4 mt-8'>
				{routes.PARK.map((park: any, index: any) => (
					<div key={index} className=''>
						<QuickAction
							path={park.path}
							title={park.title}
							iconClassName={park.iconClassName}
							icon={park.icon}
						/>
					</div>
				))}
			</div> */}

      {/* <div className='grid grid-cols-3 gap-4 mt-[32px]'>
				<Button
					type='button'
					className='w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white'>
					See All Park Managers
				</Button>
				<Button
					type='button'
					className='w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white'>
					See All Dispatch Officers
				</Button>
				<div></div>
			</div> */}
      <div className="mt-[53px]">
        {/* {
          DispactchRider?.length >=1 ? <Table
          columns={columns}
          data={DispactchRider}
          action={{
            type: ["view", "edit", "delete"],
            viewLabel: "View statememt",
          }}
        />: <div className="mt-[10rem] text-center">
        <p className="text-xl capitalize">
          Sorry, No information yet, Add a Dispatch Rider to start
        </p>
      </div>
        } */}

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
