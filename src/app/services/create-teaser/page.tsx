"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useInitializeCreateTeaserMutation } from "@/lib/features/users/services/services";
import { numberWithCommas } from "@/utils/helperFunction";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

import MarketingBudgetImg from "/public/assets/services/marketing-budget.svg";
import Image from "next/image";
import ServiceRight from "@/components/Services/ServiceRight";
import CreateTeaserForm from "@/components/Services/CustomForms/CreateTeaserForm";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {};

export interface ICreateTeaserState {
  workingTitle: string;
  filmUpload: string;
  dialogueTrack: string;
  hasMusic: "Yes" | "No";
  musicLink: string;
  wantsOriginalScore: "Yes" | "No";
  hasTitleGraphic: "Yes" | "No";
  titleGraphicUpload: string;
  posterUpload: string;
  wantsVerticalFormat: "Yes" | "No";
  productionCompanyLogos: string;
  directorName: string;
  fromTheMakersOf: string;
  releaseDate: Date | null;
  originalScoreLink: string;
  concerns: string;
}

const CreateTeaser = (props: Props) => {
  useProtectRoute();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [cost, setCost] = useState<number>(500000);
  const [createTeaser, { isError, isSuccess, error, data, isLoading }] =
    useInitializeCreateTeaserMutation();
  const [opened, { close, open }] = useDisclosure();
  const { paymentStatus, resetPaymentInitialization } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/create-pitch",
    close,
    data?.result.authorization_url,
    error
  );
  const [castNames, setCastNames] = useState<string[]>([]);
  const [scriptData, setScriptData] = useState<ICreateTeaserState>({
    concerns: "",
    dialogueTrack: "",
    directorName: "",
    filmUpload: "",
    fromTheMakersOf: "",
    hasMusic: "No",
    hasTitleGraphic: "No",
    musicLink: "",
    posterUpload: "",
    productionCompanyLogos: "",
    releaseDate: null,
    titleGraphicUpload: "",
    wantsOriginalScore: "No",
    wantsVerticalFormat: "Yes",
    workingTitle: "",
    originalScoreLink: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };
  const updateCastNamesHandler = (
    value: string,
    type: "add" | "delete" | "update",
    index: number
  ) => {
    const copiedVal = [...castNames];
    if (type === "add") {
      copiedVal.push(value);
    } else if (type === "delete") {
      copiedVal.splice(index, 1);
    } else {
      copiedVal.splice(index, 1, value);
    }
    setCastNames(copiedVal);
  };
  const setDateHandler = (val: Date | null) => {
    setScriptData({
      ...scriptData,
      releaseDate: val,
    });
  };

  const updateCost = (value: number, type: "add" | "remove") => {
    if (type === "add") {
      setCost((prev) => prev + value);
    } else {
      setCost((prev) => prev - cost);
    }
  };

  useEffect(() => {
    let cost = 500000;
    if (scriptData.wantsOriginalScore === "Yes") {
      cost += 300000;
    }
    if (scriptData.hasTitleGraphic === "Yes") {
      cost += 100000;
    }
    if (scriptData.wantsVerticalFormat === "Yes") {
      cost += 100000;
    }
    setCost(cost);
  }, [
    scriptData.wantsOriginalScore,
    scriptData.hasTitleGraphic,
    scriptData.wantsVerticalFormat,
  ]);

  useEffect(() => {
    if (data?.result.authorization_url) {
      console.log(data.result.authorization_url);
      window.location.href = data.result.authorization_url;
    }
  }, [data?.result.authorization_url]);
  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          close={() => {
            resetPaymentInitialization();
            close();
          }}
          info="Creating film teaser and trailers can take up to one to two weeks. A document will be sent for review."
        />
      ) : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            body={[
              {
                title: "Working title",
                content: scriptData.workingTitle,
              },
              {
                title: "Upload your film",
                content: scriptData.filmUpload,
              },
              {
                title: "Dialogue track",
                content: scriptData.dialogueTrack,
              },
              {
                title: "Music",
                content: scriptData.musicLink,
              },
              {
                title: "Graphic",
                content: scriptData.titleGraphicUpload,
              },
              {
                title: "Production company logo",
                content: scriptData.productionCompanyLogos,
              },
              {
                title: "Key cast names",
                content: castNames.join(", "),
              },
              {
                title: "Director's name",
                content: scriptData.directorName,
              },
              {
                title: "From the makers of",
                content: scriptData.fromTheMakersOf,
              },
              {
                title: "Release date",
                content: moment(scriptData.releaseDate).format("ll"),
              },
              {
                title: "Concerns",
                content: scriptData.concerns,
              },
            ]}
            image={<Image src={MarketingBudgetImg} alt="marketing-budget" />}
            title="Create my Film's Teaser/Trailer"
            cost={numberWithCommas(cost)}
          />
          <ServiceRight subtitle="" title="Let's start with your details">
            <CreateTeaserForm
              setDateHandler={setDateHandler}
              crewNames={castNames}
              data={scriptData}
              updateCastNameProps={updateCastNamesHandler}
              updateCost={updateCost}
              disabled={
                !scriptData.workingTitle ||
                !scriptData.filmUpload ||
                !scriptData.dialogueTrack ||
                (scriptData.hasTitleGraphic === "Yes" &&
                  !scriptData.titleGraphicUpload) ||
                (scriptData.hasMusic === "Yes" && !scriptData.musicLink) || !scriptData.productionCompanyLogos
              }
              proceed={() => {
                if (userId) {
                  createTeaser({
                    concerns: scriptData.concerns,
                    dialogueTrack: scriptData.dialogueTrack,
                    directorName: scriptData.directorName,
                    filmUpload: scriptData.filmUpload,
                    fromTheMakersOf: scriptData.fromTheMakersOf,
                    hasMusic: scriptData.hasMusic,
                    hasTitleGraphic: scriptData.hasTitleGraphic,
                    keyCastNames: castNames,
                    musicLink: scriptData.musicLink,
                    originalScoreLink: scriptData.originalScoreLink,
                    posterUpload: scriptData.posterUpload,
                    productionCompanyLogos: scriptData.productionCompanyLogos,
                    releaseDate: moment(scriptData.releaseDate).format("ll"),
                    title: "Create My Movie Trailer",
                    titleGraphicUpload: scriptData.titleGraphicUpload,
                    type: "request",
                    userId,
                    wantsOriginalScore: scriptData.wantsOriginalScore,
                    wantsVerticalFormat: scriptData.wantsVerticalFormat,
                    workingTitle: scriptData.workingTitle,
                  });
                }
              }}
              setScriptProps={setScriptDataHandler}
              isLoading={isLoading}
            />
          </ServiceRight>
        </div>
      </ServiceLayout>
    </>
  );
};

export default CreateTeaser;
