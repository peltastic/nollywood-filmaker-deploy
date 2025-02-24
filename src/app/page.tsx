"use client";
import HomeHeader from "@/components/Headers/HomeHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/assets/logo22.png";
import CountdownTimer from "@/components/Timer/CountdownTimer";

export default function Home() {
  return (
    <HomeLayout>
      <div className="bg-[#000000cf] w-full h-screen fixed left-0 top-0 z-[100] backdrop:blur-md">
        <div className="w-[95%] md:w-auto mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 text-center -translate-y-1/2 py-10 px-10  rounded-xl bg-white">
          <h1 className="font-bold text-3xl md:text-5xl">COMING SOON</h1>
          <h2 className="mt-8">NOLLYWOOD FILMMAKER is coming soon</h2>
          <div className="w-fit mx-auto mt-10">
            <CountdownTimer endTime={"2025-03-31T23:59:00+01:00"} label />
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
      <HomeHeader />
      <main></main>
    </HomeLayout>
  );
}

{
  /* <nav className=" flex  items-center pt-2 pb-2 md:pb-0 text-black-1 border-b border-b-border-gray px-0 md:px-8">
<Link href={"/"}>
<div className=" ml-6 md:ml-auto my-6 ">
<Image src={Logo} alt="logo" className="w-[3rem]" />
</div>
</Link>
<p className="ml-6 font-semibold">NOLLYWOOD FILMMAKER</p>
</nav> */
}
