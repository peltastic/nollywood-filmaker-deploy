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
type Props = {};

export interface IPitchDeckState {
  movie_title: string;
  logline: string;
  genre: string;
  platform: string;
}

const CreatePitchDeck = (props: Props) => {
  useProtectRoute();
  const [createPitchDeck, { isError, isSuccess, data, error }] =
    useInitializeCreateAPitchDeckMutation();
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [opened, { close, open }] = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [scriptData, setScriptData] = useState<IPitchDeckState>({
    genre: "",
    logline: "",
    movie_title: "",
    platform: "",
  });
  const setScriptDataHandler = (key: string, value: string) => {
    setScriptData({
      ...scriptData,
      [key]: value,
    });
  };

  const { paymentStatus } = useServicePayment(
    isError,
    isSuccess,
    "/success-page/budget-and-advice",
    close,
    data?.result.authorization_url,
    error
  );

  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);
  return (
    <>
      {opened ? (
        <InitializingTransactionModal
          paymentUrl={data?.result.authorization_url}
          status={paymentStatus}
          //   info=""
        />
      ) : null}
      <ServiceLayout>
        <div className="flex flex-row-reverse lg:flex-row flex-wrap-reverse lg:flex-wrap items-start">
          <ServiceLeft
            cost="500,000"
            title="Create a pitch deck"
            image={<Image src={BudgetAndAdviceImg} alt="budget-and-advice" />}
            body={[
              {
                title: "Working title",
                content: scriptData.movie_title,
              },
              {
                content: "",
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
            ]}
          />
        </div>
      </ServiceLayout>
    </>
  );
};

export default CreatePitchDeck;
