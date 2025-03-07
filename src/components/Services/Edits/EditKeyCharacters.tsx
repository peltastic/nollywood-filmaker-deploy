import { IKeyCharacterPayload } from "@/app/services/create-pitch-deck/page";
import InputComponent from "@/components/Input/Input";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

type Props = {
  updateCharacters: (
    value: IKeyCharacterPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  value: IKeyCharacterPayload;
  index: number;
};

const EditKeyCharacters = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <>
      {edit ? (
        <div className="flex items-center gap-x-4 ">
            <div className="w-[45%]">

          <InputComponent
            value={props.value.character}
            label={"Character" + ` ${props.index + 1}`}
            placeholder="Text"
            type=""
            changed={(val) => {
                props.updateCharacters(
                    {
                        actor: props.value.actor,
                        character: val,
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
              value={props.value.actor}
              label={"Suggested actor" + ` ${props.index + 1}`}
              placeholder="Text"
              type=""
              changed={(val) => {
                props.updateCharacters(
                  {
                    actor: val,
                    character: props.value.character,
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
            <button onClick={() => setEdit(false)} disabled={!props.value.actor || !props.value.character} className="disabled:opacity-40 text-white  flex items-center justify-center h-[1.5rem] w-[1.5rem] bg-black-2 mt-6 rounded-full">
              <MdAdd />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 text-[0.88rem] flex items-center">
          <div className="mr-auto">
            <h1 className="font-semibold">{props.value.character}</h1>
            <h2>{props.value.actor}</h2>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <FaPen className="text-xl mr-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.updateCharacters(
                  {
                    actor: props.value.actor,
                    character: props.value.character,
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

export default EditKeyCharacters;
