import type { Metadata, Viewport } from "next";
import { themeInit } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Skyler Simpson | Software Developer", template: "%s | Skyler Simpson" },
  description:
    "PHP, Laravel, and TypeScript developer. Personal projects include CigolFlow and TFTBIS, alongside professional work on DowsScripts and Usurper.",
  applicationName: "Skyler Simpson",
  openGraph: {
    title: "Skyler Simpson | Software Developer",
    description: "Projects and professional work in PHP, Laravel, and TypeScript.",
    siteName: "Skyler Simpson",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#14191f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
