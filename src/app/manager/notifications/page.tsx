"use client";
import React from "react";
import NotificationCard from "../../components/notification-card";
import SubHeader from "../../components/headers/sub-header";
import { useSelector } from "react-redux";

export default function Notification() {
  const userType = useSelector((a: any) => a?.authUser?.userAuthType);

  return (
    <>
      <SubHeader header="Notifications" hideBack />
      <div className="mt-8 grid grid-col-1 gap-y-4">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </>
  );
}
