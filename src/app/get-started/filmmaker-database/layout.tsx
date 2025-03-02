import { MantineProvider } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Nollywood Filmmaker",
    images: [
      {
        url: "https://nollywoodfilmmaker.com/filmmaker-database.jpeg",
        width: 1200,
        height: 630,
        alt: "Nollywood Filmmaker Thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider
          theme={{
            headings: {
              fontFamily: "Instrument Sans, sans-serif",
            },
            cursorType: "pointer",
          }}
        >
          .
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
