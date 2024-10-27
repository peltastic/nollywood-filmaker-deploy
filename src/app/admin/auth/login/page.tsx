"use client"
import AdminLeftSide from '@/components/Auth/AdminLeftSide'
import LoginForm from '@/components/Forms/Auth/LoginForm'
import ServiceNavbar from '@/components/Navbar/ServiceNavbar'
import React from 'react'

type Props = {}

const AdminLoginPage = (props: Props) => {
  return (
    <div className="">
      <ServiceNavbar removeOptions />
      <section className="flex xl:items-center h-[90vh] max-w-[1680px] mx-auto  mt-8 mb-8">
        <AdminLeftSide />
        <div className=" px-7 md:px-[5rem] xl:px-[2rem] chatbp:px-[5rem] text-black-2 w-full xl:w-[50%]">
          <h1 className="text-[1.75rem] font-bold">Admin Portal</h1>
          <div className="text-black-2 mt-[6rem] sm:mt-[8rem]">
            <h1 className="font-bold text-[1.75rem]">Welcome Back</h1>
            <h2 className="text-[1.13rem]">
              Lorem ipsum dolor sit amet consectetur adipisc.
            </h2>
            <LoginForm forgotPasswordLink="/consultants/auth/forgot-password" successRoute="/admin/dashboard" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminLoginPage