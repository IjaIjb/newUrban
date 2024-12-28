"use client";
import useUserTypeRouter from "@/common/hooks/useUserTypeRouter";
import { Suspense, useEffect, useState } from "react";
import Avatar from "../../../components/avatar";
import SubHeader from "../../../components/headers/sub-header";
import NotificationCard from "../../../components/notification-card";

import dispatch from "@/common/classes/dispatch.class";
import { selectAuthUser } from "@/redux/selectors/authSelectors";
import { useSelector } from "react-redux";

export default function DispatcherStatements() {
  const userData = useSelector(selectAuthUser);
  const parkId = userData?.park?.id!;

  const { pushWithUserTypePrefix, goBack } = useUserTypeRouter();
  const [dispatchOfficers, setDispatchOfficers] = useState<any[]>([]);

  const [isLoading] = useState(false);

  useEffect(() => {
    dispatch.getParkById(parkId).then((res: any) => {
      setDispatchOfficers(res);
    });
  }, []);

  return (
    <Suspense>
      <SubHeader header="Dispatcher Statements" hideBack />

      <div className="mt-8 grid grid-col-1 gap-y-4">
        {isLoading ? (
          "Loading"
        ) : dispatchOfficers?.length >= 1 ? (
          dispatchOfficers?.map((a: any) => {
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
