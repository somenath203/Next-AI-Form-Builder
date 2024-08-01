import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner"

import "./globals.css";
import Header from "./_components/Header";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Form Builder",
  description: "This is a full Stack AI Form Builder app created with the help of NextJS and Google Gemini API",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en" data-theme="light">

        <body className={inter.className}>

          <Header />

          <Toaster />

          {children}

        </body>

      </html>

    </ClerkProvider>
  );
}
