import InputComponent from "@/components/Input/Input";
import { DatePickerInput } from "@mantine/dates";
import moment from "moment";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";

type Props = {
  updateCharacter: (
    val: { name: string; date: Date[] },
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
  value: { name: string; date: Date[] };
  index: number;
  location?: boolean;
};

const EditCharacter = (props: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <>
      {edit ? (
        <div className="flex items-center gap-x-4">
          <div className="w-[45%]">
            <InputComponent
              value={props.value.name}
              label={props.location ? "Character" : "Location"}
              placeholder="Text"
              changed={(val) =>
                props.updateCharacter(
                  {
                    date: props.value.date,
                    name: val,
                  },
                  props.index,
                  "update"
                )
              }
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-[0.62rem] px-3"
              type=""
            />
          </div>
          <div className="w-[45%]">
            <p className="font-medium text-[0.88rem] mb-2">
              Locked dates, (you can select multiple)
            </p>
            <DatePickerInput
              value={props.value.date}
              size="md"
              onChange={(val) =>
                props.updateCharacter(
                  {
                    date: val,
                    name: props.value.name,
                  },
                  props.index,
                  "update"
                )
              }
              type="multiple"
            />
          </div>

          {edit && (
            <button
              onClick={() => setEdit(false)}
              disabled={!props.value.date || !props.value.name}
              className="disabled:opacity-40 text-white  flex items-center justify-center h-[1.5rem] w-[1.5rem] bg-black-2 mt-6 rounded-full"
            >
              <MdAdd />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4 text-[0.88rem] flex items-center">
          <div className="mr-auto">
            <h1 className="font-semibold">{props.value.name}</h1>
            <div className="flex">
              {props.value.date.map((el) => (
                <p key={el.toDateString()}>{moment(el).format("YYYY-MM-DD")}, &nbsp;</p>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={() => setEdit(true)}>
              <FaPen className="text-xl mr-2" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                props.updateCharacter(
                  {
                    date: props.value.date,
                    name: props.value.name,
                  },
                  props.index,
                  "delete"
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

export default EditCharacter;
