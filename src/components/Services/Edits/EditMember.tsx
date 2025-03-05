import { ITeamMember } from "@/app/services/create-pitch-deck/page";
import InputComponent from "@/components/Input/Input";
import RenderTextAreaInput from "@/components/RenderTextAreaInput/RenderTextAreaInput";
import TextArea from "@/components/TextArea/TextArea";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Props = {
  updateMember: (
    value: ITeamMember,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  value: ITeamMember;
  index: number;
};

const EditMember = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      {edit ? (
        <div className="">
          <InputComponent
            value={props.value.name}
            label="Name"
            placeholder="Text"
            type=""
            changed={(val) => {
              props.updateMember(
                {
                  bio: props.value.bio,
                  id: props.value.id,
                  name: val,
                },
                props.index,
                "update",
                props.value.id
              );
            }}
            className="w-full mt-8 text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          />

          <div className="mt-10">
            <TextArea
              changed={(val) => {
                props.updateMember(
                  {
                    bio: val,
                    id: props.value.id,
                    name: props.value.name,
                  },
                  props.index,
                  "update",
                  props.value.id
                );
              }}
              value={props.value.bio}
              labelStyle2
              className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
              label="Bio"
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 text-[0.88rem] flex items-center">
          <div className="mr-auto">
            <h1 className="font-semibold">{props.value.name}</h1>
            <RenderTextAreaInput text={props.value.bio || ""} />
          </div>
          <div className="flex ">
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <FaPen className="text-xl mr-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.updateMember(
                  {
                    bio: props.value.bio,
                    name: props.value.name,
                    id: props.value.id,
                  },
                  props.index,
                  "delete",
                  props.value.id
                );
              }}
            >
              <MdDelete className="text-2xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMember;
