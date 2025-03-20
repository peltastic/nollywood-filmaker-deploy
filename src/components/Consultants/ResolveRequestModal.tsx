import Image from "next/image";
import React, { useEffect, useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import DropZoneComponent from "../DropZone/DropZone";
import UploadImage from "/public/assets/consultant/cloud-upload.svg";
import UnstyledButton from "../Button/UnstyledButton";
import FileImg from "/public/assets/dashboard/file.svg";
import { useUploadResolveFilesMutation } from "@/lib/features/consultants/dashboard/resolve";
import Spinner from "@/app/Spinner/Spinner";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  showChat: () => void;
  orderId?: string;
  refetch?: () => void;
};

const ResolveRequestModal = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const updateFiles = (files: File[]) => {
    setFiles(files);
  };
  const [resolveFiles, { isError, isLoading, isSuccess, error }] =
    useUploadResolveFilesMutation();
  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      notify("success", "Files uploaded successfully");
      nprogress.complete();
      props.close();
      props.refetch && props.refetch();
    }
  }, [isError, isSuccess]);
  return (
    <section className="px-2 mb-[3rem] sm:mb-0 sm:px-6 py-6 z-50">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Resolve Service Request
        </h1>
        <div
          // onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      <div className="flex mt-6 items-start bg-gray-bg-7 border py-4 rounded-md px-4 border-border-gray">
        <MdInfoOutline className="text-[#14213D] mr-4 text-xl mt-1" />
        <div className="text-black-7 text-[0.88rem]">
          <p>• Upload the prepared document</p>
          <p>• Request a chat with the client</p>
          <p>• Meet with client at chosen date.</p>
        </div>
      </div>
      <div className="mb-10 mt-10">
        <DropZoneComponent setFiles={(files) => updateFiles(files)}>
          <div
            className={` text-center  mt-6 rounded-2xl border-black-2 w-full py-10`}
          >
            <Image
              src={UploadImage}
              alt="upload-image"
              className="mx-auto mb-2"
            />
            <p className="font-semibold text-black-3">
              Drag and Drop to Upload
            </p>
            <p className="text-[0.88rem] text-black-9">
              File type should be either .csv or .xlx
            </p>
            <p className="font-bold text-[0.88rem] mt-6">
              Or click to browse file
            </p>
          </div>
        </DropZoneComponent>
      </div>
      <div className="">
        {files.map((el) => (
          <div className="flex mb-4 bg-gray-bg-1 py-4 px-6 rounded-md">
            <div className="bg-gray-bg-3 h-[2.55rem] w-[2.55rem] rounded-full flex items-center justify-center mr-4">
              <Image src={FileImg} alt="file-img" />
            </div>
            <div className="text-sm">
              <p className="">{el.name}</p>
              <p>{(el.size / 1000000).toFixed(3)}MB</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-wrap mt-[1rem]">
        <UnstyledButton
          clicked={props.close}
          class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
        >
          Cancel
        </UnstyledButton>
        <UnstyledButton
          disabled={isLoading}
          clicked={() => {
            if (props.orderId) {
              nprogress.start();
              resolveFiles({
                files,
                orderId: props.orderId,
              });
            }
          }}
          class="w-[10rem] flex py-2 px-4 disabled:opacity-50 transition-all rounded-md justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 text-[0.88rem] "
        >
          {isLoading ? (
            <div className="py-1 w-[1rem]">
              <Spinner />
            </div>
          ) : (
            <p>Upload</p>
          )}
        </UnstyledButton>
      </div>
    </section>
  );
};

export default ResolveRequestModal;
