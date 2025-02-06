import { truncateStr } from "@/utils/helperFunction";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { IoMdDownload } from "react-icons/io";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";

type Props = {
  chat?: boolean;
  title?: string;
  script?: string | null;
  genre?: string;
  platform?: string;
  consultant_type?: string;
  concerns?: string;
  synopsis?: string;
  summary?: string;
  fileLink?: string;
  actors?: string;
  info?: string;
  budget?: string;
  days?: string;
  target_social?: string;
  ooh?: string;
  link?: string | null;
  chat_title?: string;
  visual?: string;
  company?: string;
  contact_info?: string;
  isChat?: boolean;
  booktime?: string;
  episodes?: string;
  showType?: string;
  series_files?: string[];
};

const OrderDetailsBody = ({
  title,
  script,
  genre,
  platform,
  consultant_type,
  concerns,
  synopsis,
  summary,
  chat,
  fileLink,
  link,
  chat_title,
  actors,
  budget,
  info,
  days,
  target_social,
  ooh,
  visual,
  company,
  contact_info,
  isChat,
  booktime,
  episodes,
  showType,
  series_files,
}: Props) => {
  return (
    <div className="text-black-2 bg-white px-6 py-6 mt-8 rounded-2xl border border-stroke-5 shadow-md shadow-[#1018280F]">
      {chat ? null : (
        <div className="border-b border-b-stroke-4">
          <div className="mb-4">
            <h1 className="font-bold mb-1">
              {showType === "Yes" ? "Series title" : "Movie title"}
            </h1>
            <p className="text-[0.88rem]">{title}</p>
          </div>
          {showType === "Yes" && series_files ? (
            <>
              <h1 className="font-bold mb-4">Series episodes' scripts</h1>
              <div className="">
                {series_files?.map((el, index) => (
                  <div className=" mb-4" key={el}>
                    <Link href={el}>
                      <div className="flex rounded-sm w-fit items-center px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
                        <p className="mr-1">{`Series script ${index + 1}`}</p>
                        <IoMdDownload />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="">
              {script && (
                <div className=" mb-4">
                  <h1 className="font-bold mb-1">Script</h1>
                  {fileLink ? (
                    <Link href={fileLink}>
                      <div className="flex rounded-sm w-fit items-center px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
                        <p className="mr-1">{script}</p>
                        <IoMdDownload />
                      </div>
                    </Link>
                  ) : (
                    <p className="text-black-3 text-[0.88rem] font-medium">
                      {script}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {chat_title && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Conversation Title</h1>
          <p className="text-[0.88rem]">{chat_title}</p>
        </div>
      )}
      <>
        {isChat && (
          <div className="">
            {booktime && (
              <div className="mt-4 border-b border-b-stroke-4 pb-4">
                <h1 className="font-bold mb-1">Chat Date</h1>
                <p className="text-[0.88rem]">
                  {moment(booktime).format("YYYY-MM-DD")}
                </p>
              </div>
            )}
            {booktime && (
              <div className="mt-4 border-b border-b-stroke-4 pb-4">
                <h1 className="font-bold mb-1">Chat Time</h1>
                <p className="text-[0.88rem]">
                  {moment(booktime).format("LT")}
                </p>
              </div>
            )}
          </div>
        )}
      </>
      {summary && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Summary</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={summary} />
          </div>
        </div>
      )}
      {episodes && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">No. of episodes</h1>
          <div className="text-[0.88rem]">
          <p>{episodes}</p>
          </div>
        </div>
      )}
      {platform && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Platform For Exhibition</h1>

          <p className="text-[0.88rem]">{platform}</p>
        </div>
      )}
      {actors && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key actors in mind</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={actors} />
          </div>
        </div>
      )}
      {days && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Number of days</h1>
          <p className="text-[0.88rem]">{days}</p>
        </div>
      )}
      {info && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Relevant information</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={info} />
          </div>
        </div>
      )}
      {target_social && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Target Social media platforms</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={target_social} />
          </div>
        </div>
      )}
      {ooh && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Target OOH platforms</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={ooh} />
          </div>
        </div>
      )}
      {visual && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Visual Style</h1>
          <p className="text-[0.88rem]">{visual}</p>
        </div>
      )}
      {company && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Production Company</h1>
          <p className="text-[0.88rem]">{company}</p>
        </div>
      )}
      {contact_info && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Relevant Contract Information</h1>
          <p className="text-[0.88rem]">{contact_info}</p>
        </div>
      )}
      {budget && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Budget Range</h1>
          <p className="text-[0.88rem]">{budget}</p>
        </div>
      )}
      {synopsis && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Logline/Synopsis</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={synopsis} />
          </div>
        </div>
      )}
      {genre && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Genre</h1>

          <p className="text-[0.88rem]">{genre}</p>
        </div>
      )}

      {consultant_type && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Consultant Type</h1>

          <p className="text-[0.88rem]">{consultant_type}</p>
        </div>
      )}
      {concerns && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Concerns</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={concerns} />
          </div>
        </div>
      )}

      {link && (
        <div className="mt-4">
          <h1 className="font-bold mb-1">Link</h1>
          <Link className="underline" href={link}>
            {truncateStr(link, 40)}
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsBody;
