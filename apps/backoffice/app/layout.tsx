import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agro Backoffice",
  description:
    "Foundation scaffold for internal operations and admin workflows.",
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru">
      <body>{props.children}</body>
    </html>
  );
}
