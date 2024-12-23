import React from "react";
import ReadMyScriptDark from "/public/assets/services/read-my-script-dark.svg";
import WatchFinalCutDark from "/public/assets/services/watch-final-cut-dark.svg";
import CreatePicthDark from "/public/assets/services/create-pitch-dark.svg";
import DraftLegalDocumentsDark from "/public/assets/services/draft-legal-documents-dark.svg";
import ChatWithProfessional from "/public/assets/services/chat-with-professional-dark.svg";
import ProductionBudgetDark from "/public/assets/services/production-budget-dark.svg";
import BudgetAndAdviceDark from "/public/assets/services/budget-and-advice-dark.svg";
import MarketingBudgetDark from "/public/assets/services/marketing-budget-dark.svg";
import Image from "next/image";

type Props = {
  service:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
};

const logoAssignment = [
  {
    service: "Chat With A Professional",
    logo: ChatWithProfessional,
  },
  {
    service: "Read my Script and advice",
    logo: ReadMyScriptDark,
  },
  {
    service: "Watch the Final cut of my film and advice",
    logo: WatchFinalCutDark,
  },
  {
    service: "Look at my Budget and advice",
    logo: BudgetAndAdviceDark,
  },
  {
    service: "Create a Marketing budget",
    logo: MarketingBudgetDark,
  },
  {
    service: "Create a Pitch based on my Script",
    logo: CreatePicthDark,
  },
  {
    service: "Draft Legal documents",
    logo: DraftLegalDocumentsDark,
  },
  {
    service: "Draft Legal documents",
    logo: DraftLegalDocumentsDark,
  },
  {
    service: "Create a Production budget",
    logo: ProductionBudgetDark,
  },
];

const GenerateDarkServiceLogo = (props: Props) => {
  return (
    <div>
      <Image
        src={
          logoAssignment.find((el) => props.service === el.service)?.logo ||
          ReadMyScriptDark
        }
        alt="service-logo"
        className="w-[1.7rem] h-[1.7rem]"
      />
    </div>
  );
};

export default GenerateDarkServiceLogo;
