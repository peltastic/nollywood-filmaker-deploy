import {
  IKeyCharacterPayload,
  IPitchDeckState,
  IKeyCrewPayload,
  ITeamMember,
} from "@/app/services/create-pitch-deck/page";
import InputComponent from "@/components/Input/Input";
import SelectComponent from "@/components/Select/SelectComponent";
import TextArea from "@/components/TextArea/TextArea";
import {
  seriesExhibitionData,
  testExhibitionData,
  testSelectData,
} from "@/utils/constants/constants";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { v4 as uuidv4, v4 } from "uuid";
import EditKeyCharacters from "../Edits/EditKeyCharacters";
import EditKeyCrew from "../Edits/EditKeyCrew";
import EditMember from "../Edits/EditMember";
import SwitchComponent from "@/components/Switch/SwitchComponent";

type Props = {
  disabled?: boolean;
  proceed: () => void;
  isLoading?: boolean;
  data: IPitchDeckState;
  setCharacters: (
    value: IKeyCharacterPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  setScriptProps: (key: string, value: string) => void;
  characters: IKeyCharacterPayload[];
  setKeyCrew: (
    value: IKeyCrewPayload,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  members: ITeamMember[];
  setMembers: (
    value: ITeamMember,
    index: number,
    type: "delete" | "update",
    id?: string
  ) => void;
  crews: IKeyCrewPayload[];
};

const PitchDeckForm = (props: Props) => {
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const [characters, setCharacters] = useState<IKeyCharacterPayload[]>(
    props.characters
  );
  const [members, setMembers] = useState<ITeamMember[]>(props.members);
  const [crews, setKeyCrew] = useState<IKeyCrewPayload[]>(props.crews);
  const [crew, setCrew] = useState<string>("");
  const [suggestion, setSuggestion] = useState<string>("");
  const [character, setCharacter] = useState<string>("");
  const [actor, setActor] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    setCharacters(props.characters);
  }, [props.characters]);

  useEffect(() => {
    setKeyCrew(props.crews);
  }, [props.crews]);

  useEffect(() => {
    setMembers(props.members);
  }, [props.members]);

  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="w-full xl:w-[90%]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.proceed();
        }}
      >
        <InputComponent
          value={props.data.movie_title}
          label="Working title"
          placeholder="Text"
          type=""
          changed={(val) => props.setScriptProps("movie_title", val)}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
        />
        <div className="grid md:grid-cols-2 gap-x-4 mt-10">
          <SelectComponent
            size="md"
            value={props.data.genre}
            setValueProps={(val) => props.setScriptProps("genre", val!)}
            label="Genre"
            data={testSelectData}
            placeholder="Select"
          />
          <div className="mt-10 md:mt-0">
            <SelectComponent
              size="md"
              value={props.data.platform}
              setValueProps={(val) => props.setScriptProps("platform", val!)}
              label="Platform for exhibition"
              data={checked ? seriesExhibitionData : testExhibitionData}
              placeholder="Select"
            />
          </div>
        </div>
        <div className="mt-10">
          <TextArea
            changed={(val) => props.setScriptProps("logline", val)}
            value={props.data.logline}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Logline/Synopsis"
          />
        </div>
        <div className="mt-10">
          <TextArea
            changed={(val) => props.setScriptProps("info", val)}
            value={props.data.info}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="More information (optional)"
          />
        </div>
        <div className="mt-10">
          <InputComponent
            value={props.data.revprojection}
            label="Revenue Projection (You can put a range)"
            placeholder="Text"
            type=""
            changed={(val) => props.setScriptProps("revprojection", val)}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          />
        </div>

        <h3 className="font-semibold mt-8">Key Characters</h3>

        {characters.map((el, index) => (
          <EditKeyCharacters
            index={index}
            updateCharacters={props.setCharacters}
            value={el}
            key={el.id}
          />
        ))}
        <div className="grid md:grid-cols-2 gap-x-4 mt-10">
          <InputComponent
            value={character}
            label="Character"
            placeholder="Text"
            type=""
            changed={(val) => {
              setCharacter(val);
            }}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          />

          <div className="mt-10 md:mt-0">
            <InputComponent
              value={actor}
              label="Suggested actor"
              placeholder="Text"
              type=""
              changed={(val) => {
                setActor(val);
              }}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            />
          </div>
        </div>

        <button
          onClick={() => {
            props.setCharacters(
              {
                actor,
                character,
                id: v4(),
              },
              1,
              "update"
            );
            setActor("");
            setCharacter("");
          }}
          disabled={!actor || !character}
          className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
        >
          <MdAdd />
          <p className="ml-1">Save</p>
        </button>

        <h3 className="font-semibold mt-10">Key Crew and Suggestions</h3>
        {crews.map((el, index) => (
          <EditKeyCrew
            index={index}
            updateCrew={props.setKeyCrew}
            value={el}
            key={el.id}
          />
        ))}
        <div className="grid md:grid-cols-2 gap-x-4 mt-10">
          <InputComponent
            value={crew}
            label="Crew"
            placeholder="Text"
            type=""
            changed={(val) => {
              setCrew(val);
            }}
            className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          />

          <div className="mt-10 md:mt-0">
            <InputComponent
              value={suggestion}
              label="Suggestion"
              placeholder="Text"
              type=""
              changed={(val) => {
                setSuggestion(val);
              }}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            />
          </div>
        </div>

        <button
          onClick={() => {
            props.setKeyCrew(
              {
                crew,
                suggestion,
                id: v4(),
              },
              1,
              "update"
            );
            setCrew("");
            setSuggestion("");
          }}
          disabled={!crew || !suggestion}
          className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
        >
          <MdAdd />
          <p className="ml-1">Save</p>
        </button>

        <h3 className="font-semibold mt-8 mb-8">Team members</h3>
        {members.map((el, index) => (
          <EditMember
            index={index}
            updateMember={props.setMembers}
            value={el}
            key={el.id}
          />
        ))}
        <InputComponent
          value={name}
          label="Name"
          placeholder="Text"
          type=""
          changed={(val) => {
            setName(val);
          }}
          className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
        />

        <div className="mt-10">
          <TextArea
            changed={(val) => setBio(val)}
            value={bio}
            labelStyle2
            className="h-[4rem] text-gray-6 text-[0.88rem] py-2 px-3"
            label="Bio"
          />
        </div>
        <button
          onClick={() => {
            props.setMembers(
              {
                bio,
                name,
                id: v4(),
              },
              1,
              "update"
            );
            setName("");
            setBio("");
          }}
          disabled={!bio || !name}
          className="disabled:opacity-50 bg-black-2 text-white py-1 px-2 text-[0.75rem] rounded-sm mt-6 flex items-center"
        >
          <MdAdd />
          <p className="ml-1">Save</p>
        </button>
        <div className="mt-10">
          <SelectComponent
            size="md"
            value={props.data.genre}
            setValueProps={(val) => props.setScriptProps("genre", val!)}
            label="Funding types"
            data={[
              {
                label: "Debt Financing",
                value: "Debt Financing",
              },
              {
                label: "Equity Funds",
                value: "Equity Funds",
              },
              {
                label: "Grants",
                value: "Grants",
              },
              {
                label: "Undecided",
                value: "Undecided",
              },
            ]}
            placeholder="Select"
          />
        </div>
        <div className="mt-10">
          <SwitchComponent
            label={<p className="ml-2">Do you have a budget range</p>}
            checked={hasBudget}
            color="#181818"
            size="md"
            setChecked={(val) => setHasBudget(val)}
          />
        </div>
        {hasBudget && (
          <div className="mt-10">
            <InputComponent
              value={props.data.estimatedBudget}
              label="Estimated budget (You can put a range)"
              placeholder="Text"
              type=""
              changed={(val) => {
                props.setScriptProps("estimatedBudget", val);
              }}
              className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default PitchDeckForm;
