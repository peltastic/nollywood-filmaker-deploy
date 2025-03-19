"use client";
import HomeHeader from "@/components/Headers/HomeHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import ProjectCountdown from "@/components/HomePage/ProjectCountdown";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const search = useSearchParams();
  const searchVal = search.get("remove");

  return (
    <HomeLayout rm={searchVal === "countdown"}>
      {searchVal === "countdown" ? null : <ProjectCountdown />}
      <HomeHeader />
      <main></main>
    </HomeLayout>
  );
}
