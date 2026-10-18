import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maharashtra AI Poster Studio",
  description: "Create Marathi, Hindi, and English posters and banners with AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
