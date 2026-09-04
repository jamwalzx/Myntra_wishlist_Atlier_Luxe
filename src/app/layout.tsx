import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Atelier Luxe | Curated Fashion Copilot",
  description: "Your personalized high-fashion AI assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${hankenGrotesk.variable} antialiased min-h-screen bg-surface text-on-surface`}
      >
        <Header />
        <main className="w-full pt-[120px] bg-surface">
          {children}
        </main>
      </body>
    </html>
  );
}
