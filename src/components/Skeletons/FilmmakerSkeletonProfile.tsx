import { Skeleton } from '@mantine/core'
import React from 'react'

type Props = {}

const FilmmakerSkeletonProfile = (props: Props) => {
  return (
    <div className="w-full">
        <div className="w-full">
            <Skeleton h={200} radius={"20px"} />
        </div>
        <div className="flex px-16 mt-4">
            <div className="w-[9rem] -mt-14 border border-white h-[9rem] rounded-full">
                <Skeleton h={144} radius={"100%"} />
            </div>
            <div className="ml-10 mr-auto">
                <div className="w-[14rem]">
                    <Skeleton h={30} />
                </div>
                <div className="w-[18rem] mt-4">
                    <Skeleton h={30} />
                </div>
                <div className="w-[10rem] mt-4">
                    <Skeleton h={30} />
                </div>
            </div>
            <div className="">
                <div className="w-[7rem]">
                    <Skeleton h={40} />
                </div>
            </div>
        </div>
        <div className="mt-16">
            <div className="">
                <Skeleton h={10} />
            </div>
            <div className="px-16">
                <div className="w-[4rem] mt-8">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="w-[10rem] pt-3">
                    <Skeleton h={20} />
                </div>
            </div>
            <div className="px-16 mt-10">
                <div className="w-[4rem] mt-8">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="w-[10rem] pt-3">
                    <Skeleton h={20} />
                </div>
            </div>
            <div className="px-16 mt-10">
                <div className="w-[4rem] mt-8">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="pt-3">
                    <Skeleton h={20} />
                </div>
                <div className="w-[10rem] pt-3">
                    <Skeleton h={20} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default FilmmakerSkeletonProfile