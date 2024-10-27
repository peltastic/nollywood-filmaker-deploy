"use client"
import ConsultantLeftSide from '@/components/Auth/ConsultantLeftSide'
import ForgotPasswordForm from '@/components/Forms/Auth/ForgotPasswordForm'
import ResetPasswordForm from '@/components/Forms/Auth/ResetPasswordForm'
import ServiceNavbar from '@/components/Navbar/ServiceNavbar'
import React from 'react'

type Props = {}

const SetPassword = (props: Props) => {
  return (
    <div className="">
      <ServiceNavbar removeOptions />
      <section className="flex xl:items-center h-[90vh] max-w-[1680px] mx-auto mt-8 mb-8">
        <ConsultantLeftSide />
        <div className=" px-7 md:px-[5rem] xl:px-[2rem] chatbp:px-[5rem] text-black-2 w-full xl:w-[50%]">
          <h1 className="text-[1.75rem] font-bold">Consultant Portal</h1>
          <div className="text-black-2 mt-[6rem] sm:mt-[8rem]">
            <h1 className="font-bold text-[1.75rem]">Secure your account</h1>
            <h2 className="text-[1.13rem]">
            Now it’s time to choose a strong password
            </h2>
            <ResetPasswordForm buttonContent="Save Password" successRoute='/success-page/set-password' />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SetPassword