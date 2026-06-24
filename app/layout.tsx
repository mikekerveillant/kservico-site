import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KServico — Shop Appliances, Motorcycles & More",
  description:
    "Philippines' largest retail store network in Luzon. Shop appliances, motorcycles, smartphones, laptops, and furniture with 0% installment financing.",
  keywords: "appliances, motorcycles, smartphones, installment, Philippines, KServico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
