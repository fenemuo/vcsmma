import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthSessionProvider } from "./components/AuthSessionProvider";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const inter = Inter({
  weight: ["400", "700"],
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
      <html lang="en" className={`${inter.className} min-h-screen antialiased`}>
      <body className="min-h-screen flex flex-col">
        <AuthSessionProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
