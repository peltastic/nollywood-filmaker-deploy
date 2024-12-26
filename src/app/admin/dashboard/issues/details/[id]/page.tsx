"use client";
import Spinner from "@/app/Spinner/Spinner";
import UnstyledButton from "@/components/Button/UnstyledButton";
import DashboardBodyLayout from "@/components/Layouts/DashboardBodyLayout";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import IssuesOrderDetails from "@/components/OrderDetails/IssuesOrderDetails";
import IssuesThread from "@/components/OrderDetails/IssuesThread";
import SelectComponent from "@/components/Select/SelectComponent";
import IssuesDetailsSkeleton from "@/components/Skeletons/IssuesDetailsSkeleton";
import TextEditor from "@/components/TextEditor/TextEditor";
import {
  useCloseIssueThreadMutation,
  useLazyGetSingleUserIssuesInfoQuery,
  usePostToIssueThreadMutation,
} from "@/lib/features/admin/issues/issues";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

type Props = {};

const AdminIssuesDetails = (props: Props) => {
  const params = useParams();
  const router = useRouter();
  const [replyToThread, result] = usePostToIssueThreadMutation();
  const [statusValue, setStatusValue] = useState<
    "closed" | "opened" | "pending" | string | null
  >(null);
  const [getSingleUserIssue, { isFetching, data }] =
    useLazyGetSingleUserIssuesInfoQuery();
  const [closeThread, res] = useCloseIssueThreadMutation();

  useEffect(() => {
    if (params.id) {
      getSingleUserIssue(params.id as string);
    }
  }, [params.id]);

  const [reply, setReply] = useState<string>("");
  const replyToThreadHandler = () => {
    if (data) {
      nprogress.start();
      replyToThread({
        isid: params.id as string,
        reply,
        role: "admin",
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
  useEffect(() => {
    if (res.isError) {
      notify(
        "error",
        "",
        (res.error as any).data?.message || "An Error Occured"
      );
    }
    if (res.isSuccess) {
      notify("success", "Action successful", "issue has been closed");
      if (params.id) {
        getSingleUserIssue(params.id as string);
      }
    }
  }, [res.isError, res.isSuccess]);

  return (
    <ServiceLayout admin>
      <DashboardBodyLayout>
        {isFetching ? (
          <IssuesDetailsSkeleton />
        ) : (
          <div className="">
            <div className="px-2 xs:px-4 sm:px-8 chatbp:px-0 py-8 chatbp:py-0">
              <header className="flex flex-wrap items-center">
                <div className="flex items-center text-[1.5rem] mr-auto">
                  <div
                    onClick={() => router.back()}
                    className="hover:bg-gray-bg-3 w-fit mr-8 transition-all cursor-pointer px-1 py-1 rounded-md"
                  >
                    <IoIosArrowBack className="text-gray-4 " />
                  </div>
                  <h1 className="text-black-2 font-bold">Order details</h1>
                </div>
                {statusValue && (
                  <div className="mt-8 md:mt-0 w-full md:w-auto flex items-center">
                    <p className="text-[0.88rem] text-black-2 mr-2">
                      Set status:
                    </p>
                    {res.isLoading ? (
                      <div className="w-[1rem]">
                        <Spinner dark />
                      </div>
                    ) : (
                      <div className="w-[7rem]">
                        <SelectComponent
                          disabled={
                            statusValue === "pending" ||
                            statusValue === "closed"
                          }
                          data={[
                            { label: "Pending", value: "pending" },
                            {
                              label: "Opened",
                              value: "opened",
                            },
                            {
                              label: "Closed",
                              value: "closed",
                            },
                          ]}
                          label=""
                          placeholder=""
                          value={statusValue}
                          defaultValue={statusValue}
                          setValueProps={(val) => {
                            if (val) {
                              setStatusValue(val);
                            }
                            if (val === "closed" && params.id) {
                              closeThread(params.id as string);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </header>
              {data && (
                <div className="mt-16">
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
                    admin
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
              {statusValue === "closed" ? null : (
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
          </div>
        )}
      </DashboardBodyLayout>
    </ServiceLayout>
  );
};

export default AdminIssuesDetails;
