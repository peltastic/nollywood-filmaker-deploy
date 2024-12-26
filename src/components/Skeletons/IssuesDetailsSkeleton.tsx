import { Skeleton } from "@mantine/core";

type Props = {};

const IssuesDetailsSkeleton = (props: Props) => {
  return (
    <div className="">
      <div className="flex">
        <div className="w-[2rem] mr-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[8rem] mr-auto">
          <Skeleton height={40} />
        </div>
        <div className="w-[4rem] mr-2">
          <Skeleton height={40} />
        </div>
        <div className="w-[8rem]">
          <Skeleton height={40} />
        </div>
      </div>
      <div className="flex mt-10">
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
        <div className="w-[80%]">
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
