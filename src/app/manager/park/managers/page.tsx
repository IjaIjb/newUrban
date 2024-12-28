"use client";
import MainTable from "@/app/components/tables/main.table";
import manager from "@/common/classes/manager.class";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { Suspense, useEffect, useState } from "react";
import Button from "../../../components/button";
import SubHeader from "../../../components/headers/sub-header";

import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";

export default function Managers() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
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
      function: (row: any) => {
        // Perform edit action using the 'row' data
      },
    },
    {
      label: "View Statement",
      function: (row: any) => {
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
      function: (row: any) => {
        // Perform edit action using the 'row' data
      },
    },
  ];
  const userData = useAppSelector(selectAuthUser)!;
  const [managerPark, setManagerPark] = useState<any[]>([]);
  const [inputField, setInputField] = useState<string>("");
  const [managerData, setMangerData] = useState<any[]>([]);

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
    const filterResult = managerData.filter((manager) =>
      manager.someProperty.toLowerCase().includes(filterText.toLowerCase())
    );
    setManagerPark(filterResult);
  };

  return (
    <Suspense>
      <SubHeader header="Park Managers" />

      <div className="mt-[53px]">
        {managerPark?.length < 1 && (
          <Button
            type="button"
            className="w-full text-primary mb-2 bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
          >
            View all archived managers
          </Button>
        )}
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
    </Suspense>
  );
}
