"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { Suspense, useEffect, useState } from "react";
import Avatar from "../../../components/avatar";
import Dropdown from "../../../components/dropdowns/dropdown";
import SubHeader from "../../../components/headers/sub-header";
import NotificationCard from "../../../components/notification-card";

import dispatch from "@/common/classes/dispatch.class";
import parkOBJ from "@/common/classes/park.class";

export default function DispatcherStatements() {
  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [selectedPark, setSelectedPark] = useState();
  const [Park, setPark] = useState<any[]>([]);
  const [dispatchOfficers, setDispatchOfficers] = useState<any[]>([]);
  const [mangerId, setManageId] = useState<any>();
  const [paramMeter, setParameter] = useState<any>("");

  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: "bus", label: "Bus" },
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "others", label: "Others" },
  ];
  useEffect(() => {
    parkOBJ.getAllByUser().then((res) => {
      setPark(res?.parks);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    // Convert the searchParams to a plain object
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setParameter(params);
    setSelectedPark(params.id);
  }, []);

  let parkOption: { value: any; label: any }[];

  if (Park && Park?.length >= 1) {
    parkOption = Park?.map((park: any) => ({
      value: park.id,
      label: park.name,
    }));
  } else {
    parkOption = [
      {
        value: null,
        label: "no Park found",
      },
    ];
  }

  useEffect(() => {
    if (selectedPark) {
      dispatch.getParkById(selectedPark).then((res: any) => {
        console.log("🚀 ~ dispatch.getAll ~ res:", res);

        setDispatchOfficers(res);
      });
    }
  }, [Park, selectedPark]);

  return (
    <Suspense>
      <SubHeader header="Dispatcher Statements" allowFilter hideBack />
      <div className="mt-6">
        <Dropdown
          options={parkOption}
          placeholder="Select Park"
          label=""
          onSelect={(e: any) => setSelectedPark(e)}
          value={selectedPark!}
          className="w-[510px]"
        />
      </div>
      <div className="mt-8 grid grid-col-1 gap-y-4">
        {isLoading ? (
          "Loading"
        ) : dispatchOfficers && dispatchOfficers.length >= 1 ? (
          dispatchOfficers.map((a: any) => {
            const queryString = new URLSearchParams({
              ...a,
            }).toString();

            return (
              <>
                {a && a.fullName ? (
                  <NotificationCard
                    hideRight
                    textBody={
                      <p>
                        Dispatcher Name:{" "}
                        <span className="text-primary">{a?.fullName}</span>
                      </p>
                    }
                    left={<Avatar body={a?.fullName.charAt(0).toUpperCase()} />}
                    onClick={() =>
                      pushWithUserTypePrefix(
                        `/park-statements/dispatcher/${a?.id}?name=${a?.fullName}`
                      )
                    }
                  />
                ) : (
                  <NotificationCard
                    hideRight
                    textBody={
                      <p>
                        <span className="text-primary">
                          No Dispatcher Found
                        </span>
                      </p>
                    }
                    left={<Avatar body="NULL" />}
                  />
                )}
              </>
            );
          })
        ) : (
          <NotificationCard
            hideRight
            textBody={
              <p>
                <span className="text-primary">No Dispatcher Found</span>
              </p>
            }
            left={<Avatar body="NULL" />}
          />
        )}
      </div>
    </Suspense>
  );
}
