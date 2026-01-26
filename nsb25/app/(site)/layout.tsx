import type { Metadata } from "next";
import { Hind } from "next/font/google";
import "../globals.css";
import Navbar from "../(site)/components/Navbar";
import Footer from "../(site)/components/Footer";

const hind = Hind({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Det Nye Norske Storband",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hind.className} antialiased flex flex-col min-h-screen font-light text-lg`}
      >
        <Navbar />
        <main className="flex-grow w-full max-w-6xl mx-auto pt-4 pb-8 px-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
