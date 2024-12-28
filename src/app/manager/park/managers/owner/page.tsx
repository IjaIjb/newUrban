"use client";
import React, { Suspense, useEffect, useState } from "react";
import SubHeader from "../../../../components/headers/sub-header";
import Button from "../../../../components/button";
import manager from "@/common/classes/manager.class";
import MainTable from "@/app/components/tables/main.table";
import { useSelector } from "react-redux";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";

import Modal from "@/app/components/modal";
import { Box, Typography } from "@mui/material";
import { ParkManager } from "@/common/types";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";

export default function Managers() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const userData = useAppSelector(selectAuthUser)!;
  const [managerPark, setManagerPark] = useState<ParkManager[]>([]);
  const [inputField, setInputField] = useState<string>("");
  const [managerData, setMangerData] = useState<ParkManager[]>([]);
  const [modalForDelete, setModalForDelete] = useState<boolean>(false);
  const [selectedManagerDetails, setSelectedManagerDetails] =
    useState<ParkManager | null>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const columns = [
    {
      key: "urbanId",
      header: "Manger id",
    },
    {
      key: "firstName",
      header: "Manager Name",
    },
    {
      key: "parkName",
      header: "Park Name",
    },
    {
      key: "email",
      header: "Email",
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

  const actionObject = [
    {
      label: "Profile",
      function: (row: ParkManager) => {
        // Perform edit action using the 'row' data
      },
    },
    {
      label: "View Statement",
      function: (row: ParkManager) => {
        // Perform edit action using the 'row' data

        const query = new URLSearchParams({
          id: row.id,
        }).toString();
        console.log(row, "row ");
        pushWithUserTypePrefix(
          `/park-statements/manager/${row?.firstName}/records?${row?.id}`
        );
        console.log("View Statement action clicked for row:", row);
      },
    },
    {
      label: "Remove/archive",
      function: (row: ParkManager) => {
        setModalForDelete(true);
        console.log("selected manager", row, modalForDelete);
        setSelectedManagerDetails(row);
        // Perform edit action using the 'row' data
      },
    },
  ];
  const deleteParkManager = (id: string) => {
    setisLoading(true);
    manager
      .delete(id)
      .then((res) => {
        console.log("response from delete park manager", res);
        setisLoading(false);
        setOpenAlert(true);
        setModalForDelete(false);
        toast.success("Manager sucessfully deleted", {
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
        const filpark = managerPark.filter(
          (park: ParkManager) =>
            park?.urbanId !== selectedManagerDetails?.urbanId
        );
        setMangerData(filpark);
        setManagerPark(filpark);
      })
      .catch((error) => {
        setisLoading(false);
        setModalForDelete(false);
        setOpenAlert(true);
        toast.error("An error occur when deleting Manager", {
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

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  useEffect(() => {
    if (userData) {
      manager
        .getByParkOwner()
        .then((res) => {
          setMangerData(res);
          setManagerPark(res);
        })
        .catch((error) => {
          console.error("Error fetching manager data:", error);
        });
    }
  }, [userData]);

  //handle search
  const SearchManager = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = managerData?.filter((parkfiltername: any) =>
        parkfiltername?.urbanId.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setManagerPark(searchFilter);
    } else {
      setManagerPark(managerData);
    }
  };

  const handleFilter = (filterText: string) => {
    const filterResult = managerData.filter((manager) => {
      console.log("managerData[0]?.someProperty11", manager.someProperty);
      return manager.someProperty
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });
    setManagerPark(filterResult);
  };
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Suspense>
      <SubHeader header="Park Managers" />
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
				 alert(JSON.stringify(values, null, 2));
      openModal();>
					See All Dispatch Officers
				</Button>
				<div></div>
			</div> */}
      <div className="mt-[53px]">
        <Modal
          isOpen={modalForDelete}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <Box>
            <Box>
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
                <br /> you would be removing this manager from your park
              </Typography>
            </Box>
            <Box className="flex justify-between py-4 gap-2">
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
                  selectedManagerDetails?.id &&
                    deleteParkManager(selectedManagerDetails.urbanId);
                }}
                style={"danger"}
                className="text-white w-full"
                type="button"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Modal>
        {
          //   managerPark?.length >=1 ? <Table
          //   columns={columns}
          //   data={managerPark}
          //   action={{
          //     type: ["view", "delete"],
          //     viewLabel: "View statememt",
          //     deleteLabel: "Remove manager",
          //   }}
          // />:
        }
        {/* {managerPark?.length < 1 && ( */}
        <Button
          type="button"
          className="w-full  text-primary mb-10 bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
        >
          View all archived managers
        </Button>
        {/* )} */}
        <MainTable
          columns={columns}
          data={managerPark}
          identifier=""
          actionObject={actionObject}
          searchBy="Manager id"
          handleSearch={(e: any) => {
            SearchManager(e);
          }}
          handleFilter={handleFilter}
          apiSearch={() => {}}
        />
      </div>
      <ToastContainer />
    </Suspense>
  );
}