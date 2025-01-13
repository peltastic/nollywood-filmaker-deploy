import { Skeleton } from "@mantine/core";

type Props = {};

const IssuesDetailsSkeleton = (props: Props) => {
  return (
    <div className="px-4 sm:px-8 chatbp:px-0 py-8 chatbp:py-0">
      <div className="flex flex-wrap">
        <div className="w-[2rem] mr-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[8rem] mr-auto">
          <Skeleton height={40} />
        </div>
        <div className="flex items-center w-full sm:w-auto mt-6 sm:mt-0">
          <div className="w-[4rem] mr-2">
            <Skeleton height={40} />
          </div>
          <div className="w-[8rem]">
            <Skeleton height={40} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-10">
        <div className="w-[20%]">
          <div className="w-[10rem]">
            <Skeleton height={30} />
          </div>
          <div className="w-[7rem] mt-5">
            <Skeleton height={30} />
          </div>
          <div className="w-[12rem] mt-5">
            <Skeleton height={30} />
          </div>
        </div>
        <div className="ml-auto w-full lg:w-[70%] xl:w-[80%] mt-10 lg:mt-0">
          <Skeleton height={150} />
          <div className="mt-8">
            <Skeleton height={250} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesDetailsSkeleton;
