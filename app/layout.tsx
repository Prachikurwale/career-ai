import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Providers } from "./components/Providers";

export const metadata: Metadata = {
  title: "CareerAI",
  description:
    "AI-powered career counseling platform for Indian students with drill-down path selection and structured career reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
         
      </body>
    </html>
  );
}
