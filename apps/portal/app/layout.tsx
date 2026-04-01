import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agro Portal",
  description: "Foundation scaffold for farmer and supplier portal.",
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{props.children}</body>
    </html>
  );
}
