import { truncateStr } from "@/utils/helperFunction";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { IoMdDownload } from "react-icons/io";
import RenderTextAreaInput from "../RenderTextAreaInput/RenderTextAreaInput";
import { ICustomerReqDetails } from "@/interfaces/consultants/dashboard/request";

type Props = {
  data?: ICustomerReqDetails;
  consultant?: boolean;
};

const OrderDetailsBody = ({ data }: Props) => {
  const fileLink = data?.request.files && data.request.files[0];
  const script =
    data?.request.nameofservice === "Read my Script and advice" ||
    data?.request.nameofservice === "Look at my Budget and advice" ||
    data?.request.nameofservice === "Create a Production budget" ||
    data?.request.nameofservice === "Create a Pitch based on my Script" ||
    data?.request.nameofservice === "Create A Pitch Deck" ||
    data?.request.nameofservice === "Creating A Movie Schedule"
      ? data?.request.movie_title
      : null;

  const isChat = data?.request.type === "Chat";
  const chat = data?.request.nameofservice === "Chat With A Professional";
  return (
    <div className="text-black-2 bg-white px-6 py-6 mt-8 rounded-2xl border border-stroke-5 shadow-md shadow-[#1018280F] mb-20">
      {chat ? null : (
        <div className="border-b border-b-stroke-4">
          <div className="mb-4">
            <h1 className="font-bold mb-1">Working title</h1>
            <p className="text-[0.88rem]">{data?.request.movie_title}</p>
          </div>
          {data?.request.showtype === "Yes" && data?.request.files ? (
            <>
              <h1 className="font-bold mb-4">Series episodes' scripts</h1>
              <div className="">
                {data.request.files?.map((el, index) => (
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
      {data?.request.chat_title && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Conversation Title</h1>
          <p className="text-[0.88rem]">{data.request.chat_title}</p>
        </div>
      )}
      <>
        {isChat && (
          <div className="">
            {data?.request.booktime && (
              <div className="mt-4 border-b border-b-stroke-4 pb-4">
                <h1 className="font-bold mb-1">Chat Date</h1>
                <p className="text-[0.88rem]">
                  {moment(data.request.booktime).format("YYYY-MM-DD")}
                </p>
              </div>
            )}
            {data.request.booktime && (
              <div className="mt-4 border-b border-b-stroke-4 pb-4">
                <h1 className="font-bold mb-1">Chat Time</h1>
                <p className="text-[0.88rem]">
                  {moment(data.request.booktime).format("LT")}
                </p>
              </div>
            )}
          </div>
        )}
      </>
      {data?.request.summary && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Summary</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data.request.summary} />
          </div>
        </div>
      )}
      {data?.request.episodes && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">No. of episodes</h1>
          <div className="text-[0.88rem]">
            <p>{data.request.episodes}</p>
          </div>
        </div>
      )}
      {data?.request.platform && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Primary platform For Exhibition</h1>

          <p className="text-[0.88rem]">{data.request.platform}</p>
        </div>
      )}
      {data?.request.actors && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key actors in mind</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data.request.actors} />
          </div>
        </div>
      )}
      {data?.request.days && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Number of days</h1>
          <p className="text-[0.88rem]">{data.request.days}</p>
        </div>
      )}
      {data?.request.info && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Relevant information</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data.request.info} />
          </div>
        </div>
      )}
      {data?.request.socialTarget && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Target Social media platforms</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data.request.socialTarget} />
          </div>
        </div>
      )}
      {data?.request.oohTarget && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Target OOH platforms</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data?.request.oohTarget} />
          </div>
        </div>
      )}
      {data?.request.visualStyle && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Visual Style</h1>
          <p className="text-[0.88rem]">{data.request.visualStyle}</p>
        </div>
      )}
      {data?.request.productionCompany && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Production Company</h1>
          <p className="text-[0.88rem]">{data.request.productionCompany}</p>
        </div>
      )}
      {data?.request.contactInfo && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Relevant Contract Information</h1>
          <p className="text-[0.88rem]">{data?.request.contactInfo}</p>
        </div>
      )}
      {data?.request.budgetrange && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Budget Range</h1>
          <p className="text-[0.88rem]">{data.request.budgetrange}</p>
        </div>
      )}
      {data?.request.shootdays && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Number of shoot days</h1>
          <p className="text-[0.88rem]">{data.request.shootdays}</p>
        </div>
      )}
      {data?.request.synopsis && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Logline/Synopsis</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data.request.synopsis} />
          </div>
        </div>
      )}
      {data?.request.genre && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Genre</h1>

          <p className="text-[0.88rem]">{data?.request.genre}</p>
        </div>
      )}
      {data?.request.revprojection && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Revenue Projection</h1>

          <p className="text-[0.88rem]">{data.request.revprojection}</p>
        </div>
      )}
      {data?.request.estimatedBudget && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Estimated budget</h1>

          <p className="text-[0.88rem]">{data.request.estimatedBudget}</p>
        </div>
      )}
      {data?.request.putinfestivals && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Put films in festival</h1>

          <p className="text-[0.88rem]">{data.request.putinfestivals}</p>
        </div>
      )}

      {data?.request.consultant && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Consultant Type</h1>

          <p className="text-[0.88rem]">{data.request.consultant}</p>
        </div>
      )}
      {data?.request.concerns && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Concerns</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data?.request.concerns} />
          </div>
        </div>
      )}
      {data?.request.startpop && data.request.startpop.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">
            Start date of principal photography
          </h1>
          <div className="text-[0.88rem]">
            <p>{data?.request.startpop[0]?.date}</p>
          </div>
        </div>
      )}
      {data?.request.stage && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Concerns</h1>
          <div className="text-[0.88rem]">
            <RenderTextAreaInput text={data?.request.stage} />
          </div>
        </div>
      )}
      {data?.request.characterbible && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Character bible</h1>
          <div className="text-[0.88rem]">
            <Link href={data.request.characterbible}>
              <div className="flex rounded-sm w-fit items-center px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
                <p className="mr-1">Download character bible</p>
                <IoMdDownload />
              </div>
            </Link>
          </div>
        </div>
      )}
      {data?.request.episodes && data.request.links.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Episode links</h1>
          {data.request.links.map((el, index) => (
            <div className="mb-2" key={el + index}>
              <Link href={el} className="underline text-[0.88rem]">
                Episode {index + 1}
              </Link>
            </div>
          ))}
        </div>
      )}
      {data?.request.links &&
        data?.request.links.length > 0 &&
        data?.request.episodes === null && (
          <div className="mt-4 border-b border-b-stroke-4 pb-4">
            <h1 className="font-bold mb-1">Link</h1>
            <div className="mb-2">
              <Link
                href={data.request.links[0]}
                className="underline text-[0.88rem]"
              >
                {truncateStr(data.request.links[0], 40)}
              </Link>
            </div>
          </div>
        )}
      {data?.request.keycharacters && data.request.keycharacters.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key Characters</h1>
          {data.request.keycharacters.map((el) => (
            <div className="" key={el._id}>
              <div className="text-[0.88rem] mb-2 flex">
                <p>{el.character}</p>
                <p className="mx-5">-</p>
                <p>{el.actor}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.request.keycrew && data.request.keycrew.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key Characters</h1>
          {data.request.keycrew.map((el) => (
            <div className="" key={el._id}>
              <div className="text-[0.88rem] mb-2 flex">
                <p>{el.crew}</p>
                <p className="mx-5">-</p>
                <p>{el.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {data?.request.characterlockdate &&
        data.request.characterlockdate.length > 0 && (
          <div className="mt-4 border-b border-b-stroke-4 pb-4">
            <h1 className="font-bold mb-1">Character locked dates</h1>
            {data.request.characterlockdate.map((el, index) => (
              <div className="" key={JSON.stringify(el.date) + index}>
                <div className="text-[0.88rem] mb-2 flex">
                  <p>{el.name}</p>
                  <p className="mx-5">-</p>
                  <div className="flex items-center">
                    {el.date.map((el) => (
                      <p>{moment(el).format("ll")},&nbsp;</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      {data?.request.locationlockeddate &&
        data.request.locationlockeddate.length > 0 && (
          <div className="mt-4 border-b border-b-stroke-4 pb-4">
            <h1 className="font-bold mb-1">Location locked dates</h1>
            {data.request.locationlockeddate.map((el, index) => (
              <div className="" key={JSON.stringify(el.date) + index}>
                <div className="text-[0.88rem] mb-2 flex">
                  <p>{el.name}</p>
                  <p className="mx-5">-</p>
                  <div className="flex items-center">
                    {el.date.map((el) => (
                      <p>{moment(el).format("ll")},&nbsp;</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      {data?.request.teamMenber && data.request.teamMenber.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key Characters</h1>
          {data.request.teamMenber.map((el) => (
            <div className="" key={el._id}>
              <div className="text-[0.88rem] mb-4">
                <p className="mb-2 font-semibold">{el.name}</p>
                <RenderTextAreaInput text={el.bio} />
              </div>
            </div>
          ))}
        </div>
      )}

      {data?.request.keyArtCreated && data.request.keyArtCreated.length > 0 && (
        <div className="mt-4 border-b border-b-stroke-4 pb-4">
          <h1 className="font-bold mb-1">Key art created files</h1>
          {data.request.keyArtCreated.map((el, index) => (
            <Link href={el} key={el} className="mb-4 block">
              <div className="flex rounded-sm w-fit items-center px-2 py-1 font-medium bg-border-gray text-black-3 text-[0.88rem]">
                <p className="mr-1">file {index + 1}</p>
                <IoMdDownload />
              </div>
            </Link>
          ))}
        </div>
      )}

      {data?.request.link && (
        <div className="mt-4">
          <h1 className="font-bold mb-1">Link</h1>
          <Link className="underline" href={data.request.link}>
            {truncateStr(data.request.link, 40)}
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsBody;
