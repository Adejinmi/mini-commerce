import type { Metadata } from "next";
import "../globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Mini Commerce",
  description: "A Technical assessment mini e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <Header />
      {children}
    </ReactQueryProvider>
  );
}
