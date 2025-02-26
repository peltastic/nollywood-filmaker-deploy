"use client";
import HomeHeader from "@/components/Headers/HomeHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import ProjectCountdown from "@/components/HomePage/ProjectCountdown";

export default function Home() {
  return (
    <HomeLayout>
      <ProjectCountdown />
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
