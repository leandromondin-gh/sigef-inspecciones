import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIGEF - Sistema de Inspecciones Gremiales",
  description: "Sistema web de expedientes administrativos de inspección gremial y obra social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`h-full ${inter.variable}`}>
      <body className="h-full flex bg-[#f0f2f5] font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pt-14 md:pt-0">
          {children}
        </div>
      </body>
    </html>
  );
}
