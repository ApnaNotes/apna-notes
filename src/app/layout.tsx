import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ApnaNotes",
    template: "%s | ApnaNotes",
  },
  description:
    "ApnaNotes helps students organize notes, track progress, study smarter, and connect through Senior Connect guidance.",
  keywords: [
    "ApnaNotes",
    "student notes platform",
    "exam preparation",
    "UPSC notes",
    "JEE notes",
    "NEET notes",
    "board exam preparation",
    "Senior Connect",
    "PYQ practice",
    "revision notes",
  ],
  authors: [{ name: "ApnaNotes Team" }],
  creator: "ApnaNotes",
  publisher: "ApnaNotes",
  applicationName: "ApnaNotes",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "ApnaNotes",
    title: "ApnaNotes | Study Smarter with Senior Connect",
    description:
      "Organize notes, revise with clarity, and connect with seniors for practical exam guidance.",
    images: [
      {
        url: "/apnanotes-logo-dark.svg",
        width: 1200,
        height: 630,
        alt: "ApnaNotes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ApnaNotes | Study Smarter with Senior Connect",
    description:
      "Organize notes, revise with clarity, and connect with seniors for practical exam guidance.",
    images: ["/apnanotes-logo-dark.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apnanotes-logo-dark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

