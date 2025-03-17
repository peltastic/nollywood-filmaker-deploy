import { IKeyCrewPayload } from "@/app/services/create-pitch-deck/page";
import InputComponent from "@/components/Input/Input";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";

type Props = {
  updateCrew: (
    value: IKeyCrewPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  value: IKeyCrewPayload;
  index: number;
};

const EditKeyCrew = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <>
      {edit ? (
        <div className="flex items-center gap-x-4 ">
          <div className="w-[45%]">
            <InputComponent
              value={props.value.crew}
              label={"Character" + ` ${props.index + 1}`}
              placeholder="Text"
              type=""
              changed={(val) => {
                props.updateCrew(
                  {
                    crew: val,
                    suggestion: props.value.suggestion,
                    id: props.value.id,
                  },
                  props.index,
                  "update",
                  props.value.id
                );
              }}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            />
          </div>

          <div className=" md:mt-0 w-[45%]">
            <InputComponent
              value={props.value.suggestion}
              label={"Suggested Professional" + ` ${props.index + 1}`}
              placeholder="Text"
              type=""
              changed={(val) => {
                props.updateCrew(
                  {
                    crew: props.value.crew,
                    suggestion: val,
                    id: props.value.id,
                  },
                  props.index,
                  "update",
                  props.value.id
                );
              }}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            />
          </div>
          {edit && (
            <button
              onClick={() => setEdit(false)}
              disabled={!props.value.crew || !props.value.suggestion}
              className="disabled:opacity-40 text-white  flex items-center justify-center h-[1.5rem] w-[1.5rem] bg-black-2 mt-6 rounded-full"
            >
              <MdAdd />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 text-[0.88rem] flex items-center">
          <div className="mr-auto">
            <h1 className="font-semibold">{props.value.crew}</h1>
            <h2>{props.value.suggestion}</h2>
          </div>
          <div className="flex ">
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <FaPen className="text-xl mr-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.updateCrew(
                  {
                    crew: props.value.crew,
                    suggestion: props.value.suggestion,
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

export default EditKeyCrew;
