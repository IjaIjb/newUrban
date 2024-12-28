// import styles from './page.module.css'
"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { Suspense, useEffect, useState } from "react";

import parkOBJ from "@/common/classes/park.class";
import { routes } from "@/common/routes";
import { useSelector } from "react-redux";
// const inter = Inter({ subsets: ['latin'] })
import { destroyCookie, setCookie } from "nookies";
import CTA from "../components/dashboard/comp/cta";
import DataCard from "../components/dashboard/comp/dataCard";
import SubHeader from "../components/headers/sub-header";
import MainTable from "../components/tables/main.table";

export default function ParkOwner({ user }: any) {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const userData = useSelector((a: any) => a?.authUser?.authUser);
  // console.log("getLoginUser:::userData::", userData.uid)

  const [parks, setParks] = useState<any>([]);
  const [parkData, setParkData] = useState<any>([]);
  const [mainParks, setMainParks] = useState<any>([]);
  const [paginaton, setPagination] = useState(1);
  const [pageLength, setPageLength] = useState<any>(0);

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

    {
      key: "actions",
      header: "Action",
    },
  ];
  const actionObject = [
    {
      label: "View Statement",
      function: (row: any) => {
        const query = new URLSearchParams({
          id: row.id,
        }).toString();
        pushWithUserTypePrefix(`/park-statements/manager?${query}`);
        console.log("View Statement action ", row);
      },
    },
    {
      label: "Edit",
      function: (row: any) => {
        // Perform delete action using the 'row' data
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
  const options =
    mainParks &&
    mainParks?.parks?.map((park: { id: any; name: any }) => {
      return {
        value: park.id,
        item: park.name,
      };
    });

  const [selectedOption, setSelectedOption] = useState<any>();
  const getAllParks = async () => {
    try {
      const res = await parkOBJ.getAllByUser();
      console.log(res, "parks");
      setParks(res?.parks);
      setParkData(res?.parks);
      setPageLength(res?.totalPages);
      setMainParks(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (userData) {
      getAllParks();
    }
  }, [userData, paginaton, selectedOption]);
  //handle filter
  const FilterPark = (e: any) => {
    console.log(
      "data from filter",
      parkData,
      e.value,
      parkData?.filter((a: any) => a.id === e.value)
    );
    if (e) {
      let filteredParks;
      if (e.item! == "All") {
        setParks(parkData?.filter((a: any) => a.id === e.value));
      }
    } else {
      setParks(parkData);
    }
  };
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

  return (
    <Suspense>
      {/* <div className='p-14 min-h-full mt-10 rounded-xl bg-white'> */}
      <SubHeader header="Dashboard" hideBack />
      <DataCard title="Total Income" amount="N345,000" percentage="10%" />

      <div className="grid grid-cols-3 gap-3 mt-[32px]">
        <CTA
          text="Add Park"
          type="green"
          onClick={() => pushWithUserTypePrefix(routes.PARK[0].path)}
        />
        <CTA
          text="Add Park Manager"
          type="blue"
          onClick={() => pushWithUserTypePrefix(routes.PARK[1].path)}
        />
        <CTA
          text="Add Dispatch Officer"
          type="red"
          onClick={() => pushWithUserTypePrefix(routes.PARK[2].path)}
        />
      </div>

      <div className="mt-[53px]">
        {/* <Table
          columns={columns}
          data={parks}
          action={{ viewLabel: "View Statement", type: ["view"] }}
        /> */}
        <MainTable
          columns={columns}
          data={parks}
          identifier=""
          actionObject={actionObject}
          searchBy="park name"
          handleSearch={(e: any) => SearchPark(e)}
          handleFilter={(e: any) => FilterPark(e)}
          apiSearch={() => {}}
        />
      </div>

      {/* <div className=' h-40 flex flex-col mt-10 items-center justify-center'>
				<ReactSVG src='./img/svg/stars.svg' />
				<p>Sorry, No information yet, Select Vehicle Type to start</p>
			</div> */}
      {/* </div> */}
    </Suspense>
  );
}
