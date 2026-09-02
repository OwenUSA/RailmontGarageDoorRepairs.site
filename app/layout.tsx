import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Railmont Garage Door Repairs",
  description: "Set true, torqued to spec, and left running quiet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
