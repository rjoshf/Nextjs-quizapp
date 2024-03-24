import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar/Navbar";
import { QuizProvider } from "./context/store";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextQuiz",
  description: "A quiz app created using nextjs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="portal-root"></div>
        <QuizProvider>
          <Navbar />
          <NextTopLoader color="#ff21C1" />
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}
