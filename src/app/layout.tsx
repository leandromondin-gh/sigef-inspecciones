import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

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
    <html lang="es" className="h-full">
      <body className="h-full flex bg-[#f0f4f8]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
