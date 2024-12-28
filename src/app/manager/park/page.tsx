"use client";
import { routes } from "@/common/routes";
import { Suspense, useEffect, useState } from "react";
import SubHeader from "../../components/headers/sub-header";
import QuickAction from "../../components/parkowner/quick-button";

import DeleteModal from "@/app/components/modal/deleteModal";
import dispatch from "@/common/classes/dispatch.class";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { destroyCookie, setCookie } from "nookies";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MainTable from "../../components/tables/main.table";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);

  const userData = useSelector(selectAuthUser);

  const [dispatchData, setDispatchData] = useState<any[]>([]);
  const [selectedDispatchData, setSelectedDispatchData] = useState("");

  const { pushWithUserTypePrefix } = useUserTypeRouter();

  const [modalForDelete, setModalForDelete] = useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

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

  const actionObject = [
    {
      label: "Edit",
      function: (row: any) => {
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
        pushWithUserTypePrefix(
          `/park-statements/dispatcher/${row.id}?name=${row?.fullName}`
        );
      },
    },
    {
      label: "Reset Password",
      function: (row: any) => {
        pushWithUserTypePrefix(`/park/dispatch-officers/reset-password`);
        console.log("reset password", row);
      },
    },
    {
      label: "Delete",
      function: (row: any) => {
        // Perform edit action using the 'row' data
        setSelectedDispatchData(row.id);
        setModalForDelete(true);
      },
    },
  ];

  const getData = () => {
    dispatch.getParkById(userData?.park?.id!).then((res) => {
      if (res.length >= 1) {
        const formattedData = res.map((rider: any) => {
          return {
            ...rider,
            ...rider.user,
            parkName: rider.park.name,
          };
        });
        setDispatchRider(formattedData);
        setDispatchData(res);
      }
    });
  };

  useEffect(() => {
    getData();
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

  const handleDeleteRequest = () => {
    setisLoading(true);
    dispatch
      .delete(selectedDispatchData)
      .then((res) => {
        setisLoading(false);
        setModalForDelete(false);
        getData();
        toast.success("Dispatch sucessfully deleted", {
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

  return (
    <Suspense>
      <SubHeader header="Park" hideBack />

      <div className="mt-8">
        <QuickAction
          path={`/${routes.PARK[2].path}`}
          title={routes.PARK[2].title}
          iconClassName={routes.PARK[2].iconClassName}
          icon={routes.PARK[2].icon}
        />

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
      </div>
      <DeleteModal
        isOpen={modalForDelete}
        isLoading={isLoading}
        onClose={() => setModalForDelete(false)}
        onDelete={handleDeleteRequest}
        title="Are you sure?"
        message="This action cannot be undone. You would be removing this request."
      />
    </Suspense>
  );
}
