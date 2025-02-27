import Image from "next/image";
import React, { useEffect } from "react";
import CancelImg from "/public/assets/cancel.svg";
import UnstyledButton from "../Button/UnstyledButton";
import {
  useDocumentVerificationCompanyMutation,
  useDocumentVerificationCrewMutation,
  useFinalCrewVerificationCompanyMutation,
  useFinalCrewVerificationCrewMutation,
} from "@/lib/features/admin/filmmaker-database/filmmaker-database";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  id: string;
  type: "crew" | "company";
  info: string;
  title: string;
  final?: boolean;
  refetch: () => void;
};

const VerifyFMDatabaseModal = (props: Props) => {
  const [verifyCrewDocuments, crewdoc] = useDocumentVerificationCrewMutation();
  const [verifyCompanyDocuments, companydoc] =
    useDocumentVerificationCompanyMutation();

  const [verifyFinalCrew, finalcrew] = useFinalCrewVerificationCrewMutation();
  const [verifyFinalCompany, finalcompany] =
    useFinalCrewVerificationCompanyMutation();

  const verifyHandler = () => {
    nprogress.start();
    if (props.type === "crew") {
      if (props.final) {
        verifyFinalCrew({ id: props.id, verified: true });
      } else {
        verifyCrewDocuments({ id: props.id, apiVetting: true });
      }
    } else {
      if (props.final) {
        verifyFinalCompany({ id: props.id, verified: true });
      } else {
        verifyCompanyDocuments({ id: props.id, apiVetting: true });
      }
    }
  };

  useEffect(() => {
    if (crewdoc.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (crewdoc.error as any).data?.message || "Couldn't verify document"
      );
    }

    if (crewdoc.isSuccess) {
      notify("success", "Document is authentic");
      nprogress.complete();
      props.refetch();
      props.close();
    }
  }, [crewdoc.isError, crewdoc.isSuccess]);
  useEffect(() => {
    if (companydoc.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (companydoc.error as any).data?.message || "Couldn't verify document"
      );
    }

    if (companydoc.isSuccess) {
      notify("success", "Document is authentic");
      nprogress.complete();
      props.refetch();
      props.close();
    }
  }, [companydoc.isError, companydoc.isSuccess]);
  useEffect(() => {
    if (finalcrew.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (finalcrew.error as any).data?.message ||
          "Couldn't complete verification"
      );
    }

    if (finalcrew.isSuccess) {
      notify("success", "Crew verification complete");
      nprogress.complete();
      props.refetch();
      props.close();
    }
  }, [finalcrew.isError, finalcrew.isSuccess]);
  useEffect(() => {
    if (finalcompany.isError) {
      nprogress.complete();
      notify(
        "error",
        "",
        (finalcompany.error as any).data?.message ||
          "Couldn't complete verification"
      );
    }

    if (finalcompany.isSuccess) {
      notify("success", "Company verification complete");
      nprogress.complete();
      props.refetch();
      props.close();
    }
  }, [finalcompany.isError, finalcompany.isSuccess]);
  return (
    <section className="py-6 px-2">
      <div className="flex items-center">
        <h1 className="font-semibold text-[1.3rem] sm:text-[1.5rem]">
          {props.title}
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>

      <p className="mt-8 text-black-9">{props.info}</p>
      <div className="flex items-center mt-10">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={
            crewdoc.isLoading ||
            companydoc.isLoading ||
            finalcompany.isLoading ||
            finalcrew.isLoading
          }
          clicked={verifyHandler}
          class="mb-4 flex justify-center xs:mb-0 py-2 rounded-md px-4  border-stroke-2 bg-black-2 text-white w-full xs:w-[8rem] border  xs:mr-4 disabled:opacity-45"
        >
          {crewdoc.isLoading ||
          companydoc.isLoading ||
          finalcompany.isLoading ||
          finalcrew.isLoading ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            <p>Verify</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default VerifyFMDatabaseModal;
