import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nollywood Filmmaker",
    openGraph: {
      title: "Nollywood Filmmaker",
      images: [
        {
          url: "https://nollywoodfilmmaker.com/default-database.jpeg",
          width: 1200,
          height: 630,
          alt: "Nollywood Filmmaker Thumbnail",
        },
      ],
    },
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  