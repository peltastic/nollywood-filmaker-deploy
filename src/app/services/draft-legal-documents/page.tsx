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

type Props = {};
export interface IDraftLegalDocumentState {
  title: string;
  production_company: string;
  information: string;
}

const DraftLegalDocumentPage = (props: Props) => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const search = searchParam.get("page");
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
  useEffect(() => {
    if (!scriptData.title) {
      router.push("/services/draft-legal-documents");
    }
  }, []);

  return (
    <ServiceLayout nonDashboard>
      <div className="flex flex-wrap items-start">
        <ServiceLeft
          title="Draft Legal Documents"
          image={
            <Image src={DraftLegalDocumentImage} alt="draft-legal-documents" />
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
                proceed={() =>
                  router.push("/services/draft-legal-documents?page=payment")
                }
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
  );
};

export default DraftLegalDocumentPage;
