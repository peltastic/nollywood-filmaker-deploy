"use client";
import HomeHeader from "@/components/Headers/HomeHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import ProjectCountdown from "@/components/HomePage/ProjectCountdown";

import { useEffect } from "react";

export default function Home() {
  return (
    <HomeLayout>
      <ProjectCountdown />
      <HomeHeader />
      <main></main>
    </HomeLayout>
  );
}
