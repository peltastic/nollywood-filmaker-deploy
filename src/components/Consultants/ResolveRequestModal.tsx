import Image from "next/image";
import React, { useState } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { MdInfoOutline } from "react-icons/md";
import DropZoneComponent from "../DropZone/DropZone";
import classes from "@/app/styles/Dropzone.module.css";
import UploadImage from "/public/assets/consultant/cloud-upload.svg";

type Props = {
  close: () => void;
};

const ResolveRequestModal = (props: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  // const updateFiles = 
  return (
    <section className="px-2 mb-[3rem] sm:mb-0 sm:px-6 py-6">
      <div className="flex">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Resolve Service Request
        </h1>
        <div
          onClick={props.close}
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
      <div className="">
        <DropZoneComponent>
          <div
            className={`${classes.Bg} text-center  mt-6 rounded-2xl border-black-2 w-full py-10`}
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
    </section>
  );
};

export default ResolveRequestModal;
