import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const pretendard = localFont({
  src: "../static/Pretendard.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "POTPOT",
  description: "파티원이 필요한 대마고 학생들 모두를 위해, POTPOT!",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" translate="no" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <ToastContainer autoClose={2000} />
        {children}
      </body>
    </html>
  );
}
