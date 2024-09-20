import HomeHeader from "@/components/Headers/HomeHeader";
import HomeLayout from "@/components/Layouts/HomeLayout";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <HomeLayout>
      {/* <Navbar /> */}
      <HomeHeader />
      <main></main>
    </HomeLayout>
  );
}
