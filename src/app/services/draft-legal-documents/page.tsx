"use client";
import ServiceLayout from "@/components/Layouts/ServiceLayout";
import ServiceLeft from "@/components/Services/ServiceLeft";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DraftLegalDocumentImage from "/public/assets/services/draft-legal-documents.svg";
import Image from "next/image";
import PaymentWindow from "@/components/PaymentWindow/PaymentWindow";
import ServiceRight from "@/components/Services/ServiceRight";
import DraftLegalDocumentsForm from "@/components/Services/CustomForms/DraftLegalDocumentsForm";
import { useProtectRoute } from "@/hooks/useProtectRoute";
import { useInitializeDraftLegalDocumentMutation } from "@/lib/features/users/services/services";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useServicePayment } from "@/hooks/useServicePayment";
import InitializingTransactionModal from "@/components/Services/InitializingTransactionModal";
import { useDisclosure } from "@mantine/hooks";
import { initializeTransactionListener } from "@/lib/socket";
import { nprogress } from "@mantine/nprogress";

type Props = {};
export interface IDraftLegalDocumentState {
  title: string;
  production_company: string;
  information: string;
}

const DraftLegalDocumentPage = (props: Props) => {
  useProtectRoute();

  const [draftLegaDocs, { data, isLoading, isSuccess, isError, error }] =
    useInitializeDraftLegalDocumentMutation();

  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
  const [opened, { close, open }] = useDisclosure();
  const [scriptData, setScriptData] = useState<IDraftLegalDocumentState>({
    information: "",
    production_company: "",
    title: "",
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
    "/success-page/draft-legal-documents",
    close,
    data?.result.authorization_url,
    error
  );

  useEffect(() => {
    if (!scriptData.title) {
      router.push("/services/draft-legal-documents");
    }
  }, []);

  useEffect(() => {
    if (paymentStatus === "pending") {
      open();
    }
  }, [paymentStatus]);

  return (
    <>
      {opened ? <InitializingTransactionModal status={paymentStatus} /> : null}
      <ServiceLayout nonDashboard>
        <div className="flex flex-wrap items-start">
          <ServiceLeft
            title="Draft Legal Documents"
            cost="100,000"
            image={
              <Image
                src={DraftLegalDocumentImage}
                alt="draft-legal-documents"
              />
            }
            body={[
              {
                title: "Name of title (for copyright)",
                content: scriptData.title,
              },
              {
                title: "Name of Production Company",
                content: scriptData.production_company,
              },
              {
                title: "Share any relevant information for contracts",
                content: scriptData.information,
              },
            ]}
          />
          {search === "payment" ? (
            <div className="w-full lg:w-[55%] text-black-2 px-[2rem] md:px-[5rem] py-[5rem]">
              <PaymentWindow successRoute="/success-page/draft-legal-documents" />
            </div>
          ) : (
            <ServiceRight
              subtitle="Lorem ipsum dolor sit amet consectetur adipisc."
              title="Let’s start with your details"
            >
              {
                <DraftLegalDocumentsForm
                  proceed={() => {
                    if (userId) {
                      draftLegaDocs({
                        contacts: scriptData.information,
                        movie_title: scriptData.title,
                        productionCompany: scriptData.production_company,
                        title: "Draft Legal documents",
                        type: "Movie Pitch",
                        userId,
                      });
                      initializeTransactionListener(userId);
                      nprogress.start();
                      open();
                    }
                  }}
                  isLoading={isLoading}
                  disabled={
                    !scriptData.title ||
                    !scriptData.information ||
                    !scriptData.production_company
                  }
                  setScriptProps={setScriptDataHandler}
                  data={scriptData}
                />
              }
            </ServiceRight>
          )}
        </div>
      </ServiceLayout>
    </>
  );
};

export default DraftLegalDocumentPage;
