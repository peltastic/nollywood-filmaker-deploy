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
import DropZoneComponent from "@/components/DropZone/DropZone";
import { BsUpload } from "react-icons/bs";
import EditFiles from "../Edits/EditFiles";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useRouter } from "next/navigation";
import Spinner from "@/app/Spinner/Spinner";
import { FaArrowRight } from "react-icons/fa";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Link from "next/link";
import FileInput from "@/components/FileInput/FileInput";

type Props = {
  setFilesProps: (
    file: File[],
    index: number,
    type: "update" | "delete" | "add"
  ) => void;
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
  files: File[];
  setSingleFile: (file: File) => void;
  file: File | null;
};

const PitchDeckForm = (props: Props) => {
  const router = useRouter();
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const [hasKeyArt, setHasKeyArt] = useState<boolean>(false);
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

  const [terms, setTerms] = useState<boolean>(false);
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
        <div className="mt-10">
          <label className="block mb-2 text-black-2 font-medium text-[0.88rem]">
            Upload script
          </label>
          <FileInput
            accept=""
            setFile={(file) => {
              if (file) {
                props.setSingleFile(file);
              }
            }}
          >
            <div className="border rounded-md border-stroke-2 py-[0.35rem] px-[0.4rem] flex items-center">
              <div className=" cursor-pointer py-2 px-3 rounded-[0.25rem] text-white font-medium text-[0.6rem] bg-black-2">
                Browse
              </div>
              <p className="text-gray-6 text-[0.88rem] ml-4">
                {props.file?.name || "No file chosen"}
              </p>
            </div>
          </FileInput>
        </div>
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
              label="Primary platform for exhibition"
              data={testExhibitionData}
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
        {/* <div className="mt-10">
          <SwitchComponent
            label={<p className="ml-2">Do you have a budget range?</p>}
            checked={hasBudget}
            color="#181818"
            size="sm"
            setChecked={(val) => setHasBudget(val)}
          />
        </div> */}
        {/* {hasBudget && (
          <> */}
            <div className="mt-10">
              <InputComponent
                value={props.data.estimatedBudget}
                label="Estimated budget"
                placeholder="Text"
                type=""
                changed={(val) => {
                  props.setScriptProps("estimatedBudget", val);
                }}
                className="w-full text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
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
          {/* </>
        )} */}

        <div className="mt-10">
          <SwitchComponent
            checked={hasKeyArt}
            color="#181818"
            label={<p className="ml-2 ">Do you have any key art created?</p>}
            setChecked={(val) => setHasKeyArt(val)}
          />
        </div>
        {hasKeyArt && (
          <div className="mt-10">
            <div className="mb-2  flex font-medium text-[0.88rem] text-[#A5A5A5]">
              <p>Upload key art</p>
              {/* <p>*</p> */}
            </div>
            <DropZoneComponent
              setFiles={(files) => {
                props.setFilesProps(files, 1, "add");
              }}
            >
              <div
                className={` text-center text-[#4B5563]  mt-6 rounded-2xl border-black-2 w-full py-10`}
              >
                <BsUpload className="text-center mx-auto mb-6" />
                <p className="">Drag and Drop here to upload</p>

                <p className="text-[0.88rem] mt-6">Or click to browse file</p>
              </div>
            </DropZoneComponent>
            <div className="mt-8">
              {props.files.map((el, index) => (
                <EditFiles
                  file={el}
                  key={el.name + el.size + index}
                  index={index}
                  updateFile={props.setFilesProps}
                />
              ))}
            </div>
          </div>
        )}

        <h3 className="font-semibold mt-10">Key Characters</h3>

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

        <h3 className="font-semibold mt-10">Key Crew and Suggestions <span className="font-medium">(Crew, e.g Producer, director, Writer and DOP)</span> </h3>
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
              label="Suggested Professional"
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

        <h3 className="font-semibold mt-8">
          Team members{" "}
          <span className="font-medium">(Include important members of your team and their bio)</span>
        </h3>
        {members.map((el, index) => (
          <EditMember
            index={index}
            updateMember={props.setMembers}
            value={el}
            key={el.id}
          />
        ))}
        <div className="mt-8">
          <InputComponent
            value={name}
            label="Name"
            placeholder="Text"
            type=""
            changed={(val) => {
              setName(val);
            }}
            className="w-full   text-[0.88rem] text-gray-6 placeholder:text-gray-6 placeholder:text-[0.88rem] py-2 px-3"
          />
        </div>

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

        <div className="mt-10 ">
          <SelectComponent
            size="md"
            value={props.data.putinfestivals}
            setValueProps={(val) =>
              props.setScriptProps("putinfestivals", val!)
            }
            label="Do you wish to put the films in festivals"
            data={[
              {
                label: "Yes",
                value: "Yes",
              },
              {
                label: "No",
                value: "No",
              },
            ]}
            placeholder="Select"
          />
        </div>
        <div className="mt-4 w-full">
          <CheckboxComponent
            setCheckedProps={(val) => setTerms(val)}
            checked={terms}
            label={
              <p className="max-w-[40rem] text-gray-3">
                By proceeding with this upload, I confirm that I have read,
                understood, and agree to the{" "}
                <span className="font-semibold underline">
                  <Link href={"/terms-and-conditions"}>
                    Terms and Conditions
                  </Link>
                </span>{" "}
                and{" "}
                <span className="font-semibold underline">
                  <Link href={"/privacy-policy"}>privacy policy</Link>
                </span>{" "}
                of the service.
              </p>
            }
          />
        </div>
        <div className="w-full flex mt-14">
          <UnstyledButton
            type="button"
            clicked={() => router.back()}
            class="rounded-md px-4 transition-all hover:bg-gray-bg-1 border-stroke-2 border"
          >
            Back
          </UnstyledButton>
          <UnstyledButton
            type="submit"
            disabled={props.disabled || props.isLoading || !terms}
            class=" justify-center w-[12rem] flex py-2 px-4 hover:bg-blue-1 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
          >
            {props.isLoading ? (
              <div className="w-[1rem] py-1">
                <Spinner />
              </div>
            ) : (
              <>
                <p className="mr-2">Proceed to payment</p>
                <FaArrowRight className="text-[0.7rem]" />
              </>
            )}
          </UnstyledButton>
        </div>
      </form>
    </div>
  );
};

export default PitchDeckForm;
