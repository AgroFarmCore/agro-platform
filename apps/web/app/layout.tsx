import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agro Platform",
  description: "Foundation scaffold for the public agro platform experience.",
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{props.children}</body>
    </html>
  );
}
