import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import NavigationProgress from "@/app/components/layout/NavigationProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MDDU | 의료기기 설계 및 사용적합성 연구실",
    template: "%s | MDDU Lab",
  },
  description:
    "Medical Device Design & Usability Lab, Yonsei University College of Medicine",
  keywords: [
    "MDDU",
    "의료기기",
    "사용적합성",
    "연세대학교",
    "Medical Device",
    "Usability",
    "Human Factors",
  ],
  openGraph: {
    title: "MDDU Lab - Medical Device Design & Usability",
    description:
      "Medical Device Design & Usability Lab, Yonsei University College of Medicine",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
