import type { Metadata } from "next";
import "./globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import Providers from "@/components/Providers/Providers";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/dropzone/styles.css";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import "react-phone-number-input/style.css";
import "@mantine/dates/styles.css";

export const metadata: Metadata = {
  title: "Make successful films | Nollywood Filmaker",
  icons: {
    icon: "/assets/icon-logo.png",
  },
  openGraph: {
    title: "Make Successful Films | Nollywood Filmmaker",
    images: [
      {
        url: "https://nollywoodfilmmaker.com/filmmaker-thumbnail.jpeg",
        width: 1200,
        height: 630,
        alt: "Nollywood Filmmaker Thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
        "
      >
        <Providers>
          <MantineProvider
            theme={{
              headings: {
                fontFamily: "Instrument Sans, sans-serif",
              },
              cursorType: "pointer",
            }}
          >
            <NavigationProgress color="#f11946" />
            <Notifications />
            {children}
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
