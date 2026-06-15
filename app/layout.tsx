import type { Metadata } from "next";
import { Pacifico } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";

const paci = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Lab for Operating Systems",
  description: "An interactive lab environment for learning and experimenting with operating systems concepts.",
  authors: [{ name: "Francis Enemuo", url: "https://github.com/fenemuo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${paci.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
