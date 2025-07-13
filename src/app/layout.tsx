import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ThemeSwitcher from "@/components/layout/themeSwitcher";
import { ThemeProvider } from "@/components/theme-provider";
import MyLoader from "@/components/mLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Commerce – Affordable Quality Products",
  description: "Shop premium, high-quality items at unbeatable prices.",
  keywords: [
    "ecommerce",
    "mini commerce",
    "shopping",
    "store",
    "quality products",
  ],
  authors: [
    { name: "Samuel Adejinmi", url: "https://mini-commerce.vercel.app" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<MyLoader />}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <ThemeSwitcher />
            {children}
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
