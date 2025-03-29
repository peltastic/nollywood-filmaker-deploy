"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useServicePayment } from "@/hooks/useServicePayment";
import { useInitializeCreateAPitchDeckMutation } from "@/lib/features/users/services/services";
import { RootState } from "@/lib/store";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BudgetAndAdviceImg from "/public/assets/services/budget-and-advice.svg";
import ServiceRight from "@/components/Services/ServiceRight";
import PitchDeckForm from "@/components/Services/CustomForms/PitchDeckForm";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";
type Props = {};

export interface IPitchDeckState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
  info: string;
  revprojection: string;
  fundingtype: string;
  putinfestivals: string;
  estimatedBudget: string;
}

export interface IKeyCharacterPayload {
  actor: string;
  character: string;
  id: string;
}

export interface IKeyCrewPayload {
  crew: string;
  id: string;
  suggestion: string;
}

export interface ITeamMember {
  id: string;
  name: string;
  bio: string;
}

const CreatePitchDeck = (props: Props) => {
  useProtectRoute();
  const [createPitchDeck, { isError, isSuccess, data, error, isLoading }] =
    useInitializeCreateAPitchDeckMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const searchParam = useSearchParams();
  const [opened, { close, open }] = useDisclosure();
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [scriptData, setScriptData] = useState<IPitchDeckState>({
    genre: "",
    logline: "",
    movie_title: "",
    platform: "",
    info: "",
    revprojection: "",
    fundingtype: "",
    putinfestivals: "No",
    estimatedBudget: "",
  });
  const [keyCharacter, setKeyCharater] = useState<IKeyCharacterPayload[]>([]);
  const [keyCrew, setKeyCrew] = useState<IKeyCrewPayload[]>([]);

  const [members, setMembers] = useState<ITeamMember[]>([]);

  const setKeyCharacterHandler = (
    value: IKeyCharacterPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => {
    if (type === "delete") {
      const copiedVal = [...keyCharacter];
      copiedVal.splice(index, 1);
      setKeyCharater(copiedVal);
    } else {
      if (id) {
        const copiedVal = [...keyCharacter];
        copiedVal.splice(index, 1, value);
        setKeyCharater(copiedVal);
      } else {
        setKeyCharater((prev) => [...prev, value]);
      }
    }
  };

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

  const setKeyCrewHandler = (
    value: IKeyCrewPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => {
    if (type === "delete") {
      const copiedVal = [...keyCrew];
      copiedVal.splice(index, 1);
      setKeyCrew(copiedVal);
    } else {
      if (id) {
        const copiedVal = [...keyCrew];
        copiedVal.splice(index, 1, value);
        setKeyCrew(copiedVal);
      } else {
        setKeyCrew((prev) => [...prev, value]);
      }
    }
  };

  const setTeamMemberHandler = (
    value: ITeamMember,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => {
    if (type === "delete") {
      const copiedVal = [...members];
      copiedVal.splice(index, 1, value);
      setMembers(copiedVal);
    }
    if (id) {
      const copiedVal = [...members];
      copiedVal.splice(index, 1, value);
      setMembers(copiedVal);
    } else {
      setMembers((prev) => [...prev, value]);
    }
  };

  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };

  const { paymentStatus, resetPaymentInitialization } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/create-pitch",
    close,
    data?.result.authorization_url,
    error
  );


  useEffect(() => {
    if (data?.result.authorization_url) {
      window.location.href = data.result.authorization_url;
    }
  }, [data?.result.authorization_url]);

  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus, isSuccess]);
  return (
    <>
      {/* {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          close={() => {
            resetPaymentInitialization()
            close();
          }}
          fileType
          info="Pitch deck creation can take up to one to two weeks. A document will be sent for review."
        />
      ) : null} */}
      <ServiceLayout nonDashboard>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap ">
          <ServiceLeft
            cost="500,000"
            title="Create my pitch deck"
            image={<Image src={BudgetAndAdviceImg} alt="budget-and-advice" />}
            crew={keyCrew}
            members={members}
            characters={keyCharacter}
            body={[
              {
                title: "Working title",
                content: scriptData.movie_title,
              },
              {
                content: scriptData.platform,
                title: "Platform for Exhibition",
              },
              {
                title: "Genre",
                content: scriptData.genre,
              },
              {
                title: "Logline / Synopsis",
                content: scriptData.logline,
              },
              {
                title: "Funding types",
                content: scriptData.fundingtype,
              },
              {
                title: "Estimated Budget",
                content: scriptData.estimatedBudget,
              },
              {
                title: "More Information",
                content: scriptData.info,
              },
              {
                title: "Put in festivals",
                content: scriptData.putinfestivals,
              },
            ]}
          />
          <ServiceRight title="Let's start with details" subtitle="">
            <PitchDeckForm
              setFilesProps={setFilesHandler}
              setCharacters={setKeyCharacterHandler}
              data={scriptData}
              isLoading={isLoading}
              crews={keyCrew}
              members={members}
              setMembers={setTeamMemberHandler}
              setKeyCrew={setKeyCrewHandler}
              proceed={() => {
                if (userId) {
                  createPitchDeck({
                    estimatedBudget: scriptData.estimatedBudget,
                    files: singleFile ? [singleFile] : [],
                    keyart: files,
                    genre: scriptData.genre,
                    info: scriptData.info,
                    keycharacters: keyCharacter.map((el) => {
                      return {
                        actor: el.actor,
                        character: el.character,
                      };
                    }),
                    keycrew: keyCrew.map((el) => {
                      return {
                        crew: el.crew,
                        role: el.suggestion,
                      };
                    }),
                    loglines: scriptData.logline,
                    movie_title: scriptData.movie_title,
                    platform: scriptData.platform,
                    putinfestivals:
                      scriptData.putinfestivals === "Yes" ? true : false,
                    revprojection: scriptData.revprojection,
                    teamMenber: members.map((el) => {
                      return {
                        bio: el.bio,
                        name: el.name,
                      };
                    }),
                    title: "Create A Pitch Deck",
                    type: "request",
                    userId,
                  });
                  initializeTransactionListener(userId);
                  nprogress.start();
                  open();
                }
              }}
              file={singleFile}
              setSingleFile={(file) => setSingleFile(file)}
              characters={keyCharacter}
              setScriptProps={setScriptDataHandler}
              files={files}
              disabled={
                !scriptData.movie_title ||
                !scriptData.genre ||
                !scriptData.logline ||
                !scriptData.platform
              }
            />
          </ServiceRight>
        </div>
      </ServiceLayout>
    </>
  );
};

export default CreatePitchDeck;
