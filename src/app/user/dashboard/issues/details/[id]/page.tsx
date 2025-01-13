"use client";
import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import IssuesOrderDetails from "@/components/OrderDetails/IssuesOrderDetails";
import IssuesThread from "@/components/OrderDetails/IssuesThread";
import IssuesDetailsSkeleton from "@/components/Skeletons/IssuesDetailsSkeleton";
import TextEditor from "@/components/TextEditor/TextEditor";
import {
  useLazyGetSingleUserIssuesInfoQuery,
  usePostToIssueThreadMutation,
} from "@/lib/features/users/issues/issues";
import { capitalizeFirstLetter } from "@/utils/helperFunction";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {};

const OrderDetails = (props: Props) => {
  const router = useRouter();
  const [getSingleUserIssue, { isFetching, data }] =
    useLazyGetSingleUserIssuesInfoQuery();
  const params = useParams();
  const [reply, setReply] = useState<string>("");
  const [replyToThread, result] = usePostToIssueThreadMutation();
  const [statusValue, setStatusValue] = useState<
    "closed" | "opened" | "pending" | string | null
  >(null);

  const replyToThreadHandler = () => {
    if (data) {
      nprogress.start();
      replyToThread({
        isid: params.id as string,
        reply,
        role: "user",
        uid: data.issue.uid._id,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setStatusValue(data.issue.status);
    }
  }, [data]);

  useEffect(() => {
    if (params.id) {
      getSingleUserIssue(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (result.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (result.error as any).data?.message || "An Error Occured"
      );
    }
    if (result.isSuccess) {
      nprogress.complete();
      notify(
        "success",
        "Reply successful",
        "Your reply to this issue has been sent"
      );
      setReply("");
      if (params.id) {
        getSingleUserIssue(params.id as string);
      }
    }
  }, [result.isError, result.isSuccess]);
  return (
    <ServiceLayout>
      <DashboardBodyLayout>
        {isFetching ? (
          <IssuesDetailsSkeleton />
        ) : (
          <div className="px-4 sm:px-8 chatbp:px-0 py-8 chatbp:py-0">
            <header className="flex flex-wrap items-center">
              <div className="flex items-center text-[1.5rem] mr-auto">
                <div
                  onClick={() => router.back()}
                  className="hover:bg-gray-bg-3 w-fit mr-4 mid:mr-8 transition-all cursor-pointer pr-1 py-1 rounded-md"
                >
                  <IoIosArrowBack className="text-gray-4 " />
                </div>
                <h1 className="text-black-2 font-bold">Issue Thread</h1>
              </div>
              <div className="flex items-center w-full sm:w-auto mt-6 sm:mt-0">
                <p className="text-[0.88rem] text-black-2 mr-2">Status</p>
                <div className="font-medium text-[0.88rem] text-black-5 rounded-md px-4 py-2 bg-white border border-stroke-2">
                  <p>{capitalizeFirstLetter(data?.issue.status || "")}</p>
                </div>
              </div>
            </header>
            {data && (
              <div className="mt-8 sm:mt-14">
                <IssuesOrderDetails
                  complain={data.issue.complain}
                  consultant={{
                    fname: data.consultant.fname,
                    lname: data.consultant.lname,
                  }}
                  createdAt={data.issue.createdAt}
                  orderId={data.issue.orderId}
                  title={data.issue.title}
                  user={{
                    fullname: `${data.issue.uid.fname} ${data.issue.uid.lname}`,
                    profilepic: data.issue.uid.profilepics,
                  }}
                />
              </div>
            )}
            <div className="flex mt-10 lg:mt-0">
              <div className="w-full lg:w-[80%] ml-auto">
                {data && (
                  <div className="">
                    {data.issueThreads.map((el) => (
                      <IssuesThread
                        reply={el.reply}
                        role={el.role}
                        key={el.reply}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            {statusValue === "opened" && (
              <div className="">
                <div className="flex ">
                  <div className="mt-10 w-full lg:w-[80%] ml-auto">
                    <TextEditor
                      changed={(val) => setReply(val)}
                      value={reply}
                    />
                  </div>
                </div>
                <div className="flex">
                  <UnstyledButton
                    clicked={replyToThreadHandler}
                    disabled={!reply || result.isLoading}
                    class="disabled:cursor-not-allowed mt-10 flex py-[0.6rem] w-[7rem] justify-center px-4 ml-auto transition-all rounded-md items-center text-white  bg-black-3 disabled:opacity-50 text-[0.88rem] "
                  >
                    {result.isLoading ? (
                      <div className="py-1 w-[1rem]">
                        <Spinner />
                      </div>
                    ) : (
                      <p>Send a reply</p>
                    )}
                  </UnstyledButton>
                </div>
              </div>
            )}
          </div>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default OrderDetails;
