import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "송정은 — Sound Designer Portfolio",
  description: "송정은 사운드 디자이너의 경력과 사운드 디자인 작업을 소개하는 포트폴리오입니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
