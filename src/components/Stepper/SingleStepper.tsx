import React from 'react'

type Props = {
    value: number
    text: string
    active: number
}

const SingleStepper = ({active, text, value}: Props) => {
  return (
    <div
    className={` border-2 ${
      active === value
        ? "border-stepper-green text-stepper-green"
        : "text-[#A5A5A5] border-stroke-12"
    }  flex items-center py-3 lg:py-2 px-6 lg:px-4 rounded-full w-[15rem] lg:w-auto mb-6 lg:mb-0`}
  >
    <div
      className={`mr-2 text-[0.88rem] border-2 ${
        active === value ? "border-stepper-green" : "border-stroke-12"
      }  rounded-full h-6 w-7 flex items-center justify-center`}
    >
      <p>{value}</p>
    </div>
    <p className={`font-medium`}>{text}</p>
  </div>
  )
}

export default SingleStepper