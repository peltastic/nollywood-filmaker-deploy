"use client";
import FeedbackRatingCard from "@/components/Admin/FeedbackRatingCard";
import TopConsultants from "@/components/Admin/TopConsultants";
import {
  IFeedbackData,
  feedback_column,
} from "@/components/Columns/admin/FeedbackColumn";
import DashboardPlate from "@/components/Dashboard/DashboardPlate";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import CustomerSkeleton from "@/components/Skeletons/CustomersSkeleton";
import FeedbackRatingSkeleton from "@/components/Skeletons/FeedbackRatingSkeleton";
import { DataTable } from "@/components/Tables/DataTable";
import {
  useFetchAllFeedbackQuery,
  useFetchAverageRatingsQuery,
  useFetchTopConsultantsQuery,
} from "@/lib/features/admin/feedback/feedback";
import { Skeleton } from "@mantine/core";
import moment from "moment";
import React, { useEffect, useState } from "react";

type Props = {};

const ratings = [
  {
    rating: 5,
    percentage: 80,
  },
  {
    rating: 4,
    percentage: 20,
  },
  {
    rating: 3,
    percentage: 40,
  },
  {
    rating: 2,
    percentage: 30,
  },
  {
    rating: 1,
    percentage: 80,
  },
];

// const feedbacks: IFeedbackData[] = [
//   {
//     comment: "The service was splendid!",
//     customer: "Jane Cooper",
//     date: "22 Jan 2022",
//     email: "jgraham@example.com",
//     quality: 5,
//     speed: 5,
//   },
//   {
//     comment: "The service was splendid!",
//     customer: "Jenny Wilson",
//     date: "22 Jan 2022",
//     email: "w.lawson@example.com",
//     quality: 5,
//     speed: 5,
//   },
// ];

const FeedbacksPage = (props: Props) => {
  const [feedbackData, setFeedbackData] = useState<IFeedbackData[]>([]);
  const { data, isFetching } = useFetchAllFeedbackQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const result = useFetchAverageRatingsQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const topConsultants = useFetchTopConsultantsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      const refined_data: IFeedbackData[] = data.feedbacks.map((el) => {
        return {
          _id: el._id,
          comment: el.reason,
          customer: `${el.userId?.fname} ${el.userId?.lname}`,
          date: moment(el.createdAt).format("ll"),
          email: `${el.userId?.email}`,
          orderId: el.orderId,
          quality: el.quality,
          speed: el.speed,
          image: el.userId?.profilepics,
        };
      });
      setFeedbackData(refined_data);
    }
  }, [data]);
  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        <div className="px-2 xs:px-8 chatbp:px-0 py-6 chatbp:py-0">
          <DashboardPlate title="Feedback">
            <div className="flex flex-wrap xl:flex-nowrap py-8 gap-x-6">
              <div className="w-full md:w-[48%] xl:w-[30%] mr-auto xl:mr-0">
                {result.isFetching ? (
                  <FeedbackRatingSkeleton />
                ) : (
                  <>
                    <FeedbackRatingCard
                      title="Delivery Quality"
                      average_rating={
                        result.data?.avgQuality.toFixed(1).toString() || "0"
                      }
                      ratings_data={ratings}
                      total_rating="125"
                    />
                  </>
                )}
              </div>
              <div className="w-full md:w-[48%] xl:w-[30%] mt-8 md:mt-0">
                {result.isFetching ? (
                  <FeedbackRatingSkeleton />
                ) : (
                  <FeedbackRatingCard
                    average_rating={
                      result.data?.avgSpeed.toFixed(1).toString() || "0"
                    }
                    ratings_data={ratings}
                    total_rating={"125"}
                    title="Delivery Speed"
                  />
                )}
              </div>
              <div className="mt-8 xl:mt-0 w-full xl:w-[40%]">
                {topConsultants.isFetching ? (
                  <div className="">
                    <div className="w-[6rem] my-8">
                      <Skeleton height={20} />
                    </div>
                    <CustomerSkeleton />
                    <CustomerSkeleton />
                    <CustomerSkeleton />
                    <CustomerSkeleton />
                    <CustomerSkeleton />
                    <CustomerSkeleton />
                  </div>
                ) : (
                  <TopConsultants
                    data={
                      topConsultants.data?.consultants
                        ? topConsultants.data.consultants.map((el) => {
                            return {
                              fname: el.fname,
                              lname: el.lname,
                              id: `${el.fname + el.lname}`,
                              rating: (el.avgQuality + el.avgSpeed) / 2,
                              requests: (
                                el.appointmentCount + el.totalRequest
                              ).toString(),
                            };
                          })
                        : []
                    }
                  />
                )}
              </div>
            </div>
          </DashboardPlate>
          <div className="mt-16">
            <DataTable
              isFetching={isFetching}
              loaderLength={10}
              title="Customer feedback"
              columns={feedback_column}
              data={feedbackData}
              emptyHeader="No feedbacks"
            />
          </div>
        </div>
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default FeedbacksPage;
