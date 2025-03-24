"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreatePitchImg from "/public/assets/services/create-pitch.svg";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import CreatePitchForm from "@/components/Services/CustomForms/CreatePitchForm";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useInitializeMovieScheduleMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDisclosure } from "@mantine/hooks";
import { useServicePayment } from "@/hooks/useServicePayment";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
import { numberWithCommas } from "@/utils/helperFunction";
import moment from "moment";

type Props = {};

export interface ICreatePitchState {
  movie_title: string;
  platform: string;
  actors_in_mind: string;
  // crew_in_mind: string;
  // visual: string;
  information: string;
  budget: string;
  showType: string;
  episodes: string;
  days?: string;
  startpop?: Date | null;
}

const MovieSchedulePage = (props: Props) => {
  useProtectRoute();
  const [cost, setCost] = useState<number>(150000);
  const [movieSchedule, { data, isLoading, isSuccess, isError, error }] =
    useInitializeMovieScheduleMutation();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [file, setFile] = useState<File | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const [characterLockedDates, setCharacterLockedDate] = useState<
    { name: string; date: Date[] }[]
  >([]);

  const [locationLockedDate, setLocationLockedDate] = useState<
    { name: string; date: Date[] }[]
  >([]);

  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<ICreatePitchState>({
    movie_title: "",
    actors_in_mind: "",
    budget: "",
    // crew_in_mind: "",
    information: "",
    // visual: "",
    platform: "",
    episodes: "",
    showType: "No",
    days: "",
    startpop: null,
  });
  const { paymentStatus, resetPaymentInitialization } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/movie-schedule",
    close,
    data?.result.authorization_url,
    error
  );
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus, isSuccess]);

  const setFilesHandler = (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => {
    if (files) {
      if (type === "update") {
        const copiedVal = [...files];
        copiedVal.splice(index, 1, file[0]);
        setFiles(copiedVal);
      } else if (type === "delete") {
        const copiedVal = [...files];
        copiedVal.splice(index, 1);
        setFiles(copiedVal);
      } else {
        setFiles((prev) => [...prev, ...file]);
      }
    }
  };

  const updateCharaterLocked = (
    val: { name: string; date: Date[] },
    index: number,
    type: "update" | "delete" | "add"
  ) => {
    if (type === "update") {
      const copiedVal = [...characterLockedDates];
      copiedVal.splice(index, 1, val);
      setCharacterLockedDate(copiedVal);
    } else if (type === "delete") {
      const copiedVal = [...characterLockedDates];
      copiedVal.splice(index, 1);
      setCharacterLockedDate(copiedVal);
    } else {
      setCharacterLockedDate((prev) => [...prev, val]);
    }
  };
  const updateLocationLocked = (
    val: { name: string; date: Date[] },
    index: number,
    type: "update" | "delete" | "add"
  ) => {
    if (type === "update") {
      const copiedVal = [...characterLockedDates];
      copiedVal.splice(index, 1, val);
      setLocationLockedDate(copiedVal);
    } else if (type === "delete") {
      const copiedVal = [...characterLockedDates];
      copiedVal.splice(index, 1);
      setLocationLockedDate(copiedVal);
    } else {
      setLocationLockedDate((prev) => [...prev, val]);
    }
  };

  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          info="Movie schedule can take up to one to two weeks. A document will be sent for review."
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          fileType
          close={() => {
            resetPaymentInitialization();
            close();
          }}
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            title="Create my Movie Schedule"
            cost={
              scriptData.showType === "Yes"
                ? numberWithCommas(Number(scriptData.episodes) * 80000)
                : "250,000"
            }
            image={<Image src={CreatePitchImg} alt="create-pitch" />}
            episodes={scriptData.episodes}
            charactersLocked={characterLockedDates}
            locationLocked={locationLockedDate}
            series
            body={[
              {
                title: "Working title",
                content: scriptData.movie_title,
              },
              {
                title: "Upload your script",
                content: file?.name || "",
              },
              {
                title: "Platform for exhibition",
                content: scriptData.platform,
              },
              // {
              //   title: "Key actors in mind",
              //   content: scriptData.actors_in_mind,
              // },
              // {
              //   title: "Key Crew in mind",
              //   content: scriptData.crew_in_mind,
              // },
              // {
              //   title: "Number of days",
              //   content: scriptData.visual,
              // },
              {
                title: "Relevant information",
                content: scriptData.information,
              },
              // {
              //   title: "Budget Range",
              //   content: scriptData.budget,
              // },
            ]}
          />
          {search === "payment" ? (
            <div className="w-full lg:w-[55%] text-black-2 px-[2rem] md:px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/create-pitch" />
            </div>
          ) : (
            <ServiceRight subtitle="" title="Let’s start with your details">
              <CreatePitchForm
                file={file}
                setFilesProps={setFilesHandler}
                proceed={() => {
                  if (userId) {
                    movieSchedule({
                      actors: "",
                      budgetrange: "",
                      // crew: scriptData.crew_in_mind,
                      files: scriptData.showType === "Yes" ? files : [file],
                      info: scriptData.information,
                      movie_title: scriptData.movie_title,
                      platform: scriptData.platform,
                      title: "Creating A Movie Schedule",
                      type: "request",
                      userId,
                      showtype: scriptData.showType,
                      episodes: scriptData.episodes,
                      // visualStyle: scriptData.visual,
                      fileName: file?.name || "",
                      characterlockdate: characterLockedDates.map((el) => {
                        return {
                          date: el.date.map((el) =>
                            moment(el).format("YYYY-MM-DD")
                          ),
                          name: el.name,
                        };
                      }),
                      locationlockeddate: locationLockedDate.map((el) => {
                        return {
                          date: el.date.map((el) =>
                            moment(el).format("YYYY-MM-DD")
                          ),
                          name: el.name,
                        };
                      }),
                      days: scriptData.days,
                      startpop: [
                        {
                          date: moment(scriptData.startpop).format(
                            "YYYY-MM-DD"
                          ),
                        },
                      ],
                    });
                    initializeTransactionListener(userId);
                    nprogress.start();
                    open();
                  }
                }}
                setDateHandler={(val) =>
                  setScriptData({
                    ...scriptData,
                    startpop: val,
                  })
                }
                disabled={
                  !scriptData.movie_title ||
                  !scriptData.platform ||
                  // !scriptData.visual ||
                  (scriptData.showType === "No" ? !file : !files.length)
                }
                characterlocked={characterLockedDates}
                setChacterLocked={updateCharaterLocked}
                isLoading={isLoading}
                setFileProps={(file) => setFile(file)}
                setScriptProps={setScriptDataHandler}
                data={scriptData}
                locationlocked={locationLockedDate}
                setLocationLocked={updateLocationLocked}
                fileName={file?.name}
                setCost={(val) => setCost(val)}
                files={files}
              />
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default MovieSchedulePage;
