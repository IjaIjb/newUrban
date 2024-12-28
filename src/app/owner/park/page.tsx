"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { routes } from "@/common/routes";
import { Suspense, useEffect, useState } from "react";
import Button from "../../components/button";
import SubHeader from "../../components/headers/sub-header";
import QuickAction from "../../components/parkowner/quick-button";

import parkOBJ from "@/common/classes/park.class";
import { USER_TYPE } from "@/common/types";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useAppSelector } from "@/redux/store";
import { destroyCookie, setCookie } from "nookies";
import { useSelector } from "react-redux";
import MainTable from "../../components/tables/main.table";

export default function Park() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [DispatchData, setDispatchData] = useState<any>([]);
  const [Park, setPark] = useState<any[]>([]);
  const [parkData, setParkData] = useState<any>([]);
  const [inputField, setInputField] = useState<any>("");
  const [paginaton, setPagination] = useState(1);
  const [pageLength, setPageLength] = useState<any>(0);

  const userData = useAppSelector(selectAuthUser)!;

  const { pushWithUserTypePrefix, pathname } = useUserTypeRouter();
  const columns = [
    {
      key: "name",
      header: "Park Name",
    },
    {
      key: "totalTrip",
      header: "total trips",
    },
    {
      key: "successfulTrip",
      header: "successful trips",
    },
    {
      key: "scheduledTrip",
      header: "scheduled trips",
    },
    // {
    //   key: "cancelledTrip",
    //   header: "cancelled trips",
    // },
    {
      key: "actions",
      header: "Action",
    },
  ];
  const disColumns = [
    {
      key: "fullName",
      header: "Dispatch Name",
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
      label: "View Statement",
      function: (row: any) => {
        // Perform edit action using the 'row' data

        const query = new URLSearchParams({
          id: row.id,
        }).toString();
        pushWithUserTypePrefix(`/park-statements/manager?${query}`);
        console.log("View Statement action clicked for row:", row);
      },
    },
    {
      label: "Edit",
      function: (row: any) => {
        // Perform delete action using the 'row' data
        const editParkData: string = JSON.stringify(row);
        //clear any cookies before creating a new one
        destroyCookie(null, "editPark");
        //create new cookie
        setCookie(null, "editPark", editParkData, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        pushWithUserTypePrefix(`park/edit-park`);
      },
    },
  ];
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  const [parks, setParks] = useState<any[]>([]);

  useEffect(() => {
    if (userData) {
      parkOBJ
        .getAllByUser()
        .then((res) => {
          setParks(res?.parks);
          setParkData(res?.parks);
          setPageLength(res?.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Park, paginaton, userData]);
  //handle search
  const SearchPark = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = parkData?.filter((parkfiltername: any) =>
        parkfiltername?.name.toLowerCase().includes(e.toLowerCase())
      );
      console.log(searchFilter, "swae");
      setParks(searchFilter);
    } else {
      setParks(parkData);
    }
  };

  //handle search
  const SearchDispatch = (e: any) => {
    if (e.trim().length >= 1) {
      const searchFilter = DispatchData?.filter((rider: any) =>
        rider?.fullName.toLowerCase().includes(e.toLowerCase())
      );
      setDispatchRider(searchFilter);
    } else {
      setDispatchRider(DispatchData);
    }
  };
  return (
    <Suspense>
      <SubHeader header="Park" hideBack />
      {userType === USER_TYPE.PARK_OWNER ? (
        <>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {routes?.PARK?.map((park: any, index: any) => (
              <div key={index} className="">
                <QuickAction
                  path={`/${park?.path}`}
                  title={park?.title}
                  iconClassName={park?.iconClassName}
                  icon={park?.icon}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-[32px]">
            <Button
              type="button"
              onClick={() => {
                pushWithUserTypePrefix("/park/managers");
              }}
              className="w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
            >
              See All Park Managers
            </Button>
            <Button
              type="button"
              onClick={() => {
                userType === pushWithUserTypePrefix("/park/dispatch-officers");
              }}
              className="w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white"
            >
              See All Dispatch Officers
            </Button>
            <div></div>
          </div>
          <div className="mt-[53px]">
            <MainTable
              columns={columns}
              data={parks}
              identifier=""
              actionObject={actionObject}
              searchBy="park name"
              filterMenu={null}
              handleSearch={(e: any) => SearchPark(e)}
              handleFilter={() => {}}
              apiSearch={() => {}}
            />
          </div>
        </>
      ) : (
        userType === USER_TYPE.PARK_MANAGER && (
          <div className="mt-8">
            <QuickAction
              path={routes.PARK[2].path}
              title={routes.PARK[2].title}
              iconClassName={routes.PARK[2].iconClassName}
              icon={routes.PARK[2].icon}
            />
            <div className="grid grid-cols-3 gap-4 mt-[32px]">
              {userType === USER_TYPE.PARK_MANAGER ? null : (
                <Button
                  type="button"
                  onClick={() => pushWithUserTypePrefix("/park/managers")}
                  className="w-full text-primary bg-primary bg-opacity-20 hover:bg-primary hover:text-white"
                >
                  See All Park Managers
                </Button>
              )}

              <Button
                type="button"
                onClick={() =>
                  pushWithUserTypePrefix("/park/dispatch-officers")
                }
                className="w-full bg-primary_blue text-primary_blue bg-opacity-20 hover:bg-primary_blue hover:text-white"
              >
                See All Dispatch Officers
              </Button>
              <div></div>
            </div>
            <div className="mt-[53px]">
              <MainTable
                columns={disColumns}
                data={DispactchRider}
                identifier=""
                searchBy="Rider's Name "
                handleSearch={(e: any) => SearchDispatch(e)}
                handleFilter={() => {}}
                apiSearch={() => {}}
              />
            </div>
          </div>
        )
      )}
    </Suspense>
  );
}
