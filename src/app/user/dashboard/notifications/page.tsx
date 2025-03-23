"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SingleNotis from "@/components/Notification/SingleNotis";
import { useLazyFetchUserNotificationsQuery } from "@/lib/features/users/notifications/notifications";
import { setNotificationState } from "@/lib/slices/notificationSlice";
import { RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const UserNotificationsPage = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const dispatch = useDispatch();
  const [getNotifications, { data, isSuccess }] =
    useLazyFetchUserNotificationsQuery();
  useEffect(() => {
    if (userId) {
      getNotifications(userId);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setNotificationState(false));
    }
  }, [isSuccess]);
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        <div className="bg-white py-6 px-4 min-h-screen w-[60%] min-w-[60rem] mx-auto rounded-2xl ">
          <h1 className="text-2xl font-semibold mb-10">Notifications</h1>
          {data?.notifications.map((el) => (
            <SingleNotis key={el._id} data={el} />
          ))}
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default UserNotificationsPage;
