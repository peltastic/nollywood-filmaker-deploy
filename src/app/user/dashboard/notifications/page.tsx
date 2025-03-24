"use client";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import SingleNotis from "@/components/Notification/SingleNotis";
import SingleNotificationSkeleton from "@/components/Skeletons/SingleNotificationSkeleton";
import { useLazyFetchUserNotificationsQuery } from "@/lib/features/users/notifications/notifications";
import { setNotificationState } from "@/lib/slices/notificationSlice";
import { RootState } from "@/lib/store";
import { Pagination } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const UserNotificationsPage = (props: Props) => {
  const [activePage, setActivePage] = useState<number>(1);
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const dispatch = useDispatch();
  const [getNotifications, { data, isSuccess, isFetching }] =
    useLazyFetchUserNotificationsQuery();
  useEffect(() => {
    if (userId) {
      getNotifications({ id: userId, limit: 10 });
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
        <section className="py-10 chatbp:py-0">
          <div className="bg-white py-10 px-10 min-h-screen w-[95%] md:w-[60%] max-w-[60rem] mx-auto rounded-2xl ">
            <h1 className="text-2xl font-semibold mb-10">Notifications</h1>
            {isFetching ? (
              <>
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
                <SingleNotificationSkeleton />
              </>
            ) : (
              <>
                {data?.notifications.map((el) => (
                  <SingleNotis key={el._id} data={el} />
                ))}
              </>
            )}
          </div>
          <div className=" w-[60%] max-w-[60rem] mx-auto">
            {data && data.pagination.totalPages > 1 && (
              <Pagination
                mt={"xl"}
                total={data.pagination.totalPages}
                value={activePage}
                color="#333333"
                onChange={(val) => {
                  if (userId) {
                    getNotifications({
                      limit: 10,
                      page: val,
                      id: userId,
                    });
                  }
                  setActivePage(val);
                }}
              />
            )}
          </div>
        </section>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default UserNotificationsPage;
