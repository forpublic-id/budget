import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  title: {
    template: "%s | Budget ForPublic.id",
    default: "Budget ForPublic.id - Transparansi Anggaran Indonesia",
  },
  description:
    "Platform transparansi untuk APBN dan APBD Indonesia dengan visualisasi interaktif dan analisis mendalam",
  keywords: [
    "APBN",
    "APBD",
    "anggaran negara",
    "transparansi",
    "keuangan publik",
    "Indonesia",
    "visualisasi data",
    "budget transparency",
  ],
  authors: [{ name: "ForPublic.id" }],
  creator: "ForPublic.id",
  publisher: "ForPublic.id",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://budget.forpublic.id",
    title: "Budget ForPublic.id - Transparansi Anggaran Indonesia",
    description:
      "Platform transparansi untuk APBN dan APBD Indonesia dengan visualisasi interaktif dan analisis mendalam",
    siteName: "Budget ForPublic.id",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget ForPublic.id - Transparansi Anggaran Indonesia",
    description:
      "Platform transparansi untuk APBN dan APBD Indonesia dengan visualisasi interaktif dan analisis mendalam",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
