import React, { ReactNode } from "react";
import { Metadata } from "next";
import axios from "axios";

type Props = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = await axios.get(
    `https://api.nollywoodfilmmaker.com/api/join/crew/${params.id}`
  );
  if (!info) {
    return {
      title: "Profile not found",
    };
  }
  return {
    title: `${info.data.crew.firstName} ${info.data.crew.lastName}`,
    openGraph: {
      title: `${info.data.crew.firstName} ${info.data.crew.lastName}`,
      images: [{ url: info.data.crew.badgelink }],
    },
  };
}

export default function RootLayout({ children }: Props) {
  return <div className="">{children}</div>;
}
