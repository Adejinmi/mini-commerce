import "../globals.css";
import { ReactQueryProvider } from "@/lib/react-query";
import Header from "@/components/layout/header";

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
