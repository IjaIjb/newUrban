"use client";
import MainTable from "@/app/components/tables/main.table";
import dispatch from "@/common/classes/dispatch.class";
import { Suspense, useEffect, useState } from "react";
import SubHeader from "../../../components/headers/sub-header";

export default function DispatchOfficers() {
  const [DispactchRider, setDispatchRider] = useState<any[]>([]);
  const [dispatchData, setDispatchData] = useState<any[]>([]);

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
        // pushWithUserTypePrefix(`/park-statements/manager?${query}`)
        console.log("View Statement action clicked for row:", row);
      },
    },
    {
      label: "Reset Password",
      function: (row: any) => {
        console.log("reset password", row);
      },
    },
    {
      label: "Delete",
      function: (row: any) => {
        // Perform edit action using the 'row' data
      },
    },
  ];

  // useEffect(() => {
  //   dispatch.getParkByManager().then((res) => {
  //     if (res.length >= 1) {
  //       setDispatchRider(res);
  //       setDispatchData(res);
  //     }
  //   });
  // }, []);
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
  return (
    <Suspense>
      <SubHeader header="Dispatch Officers" />
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
