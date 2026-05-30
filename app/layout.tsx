import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AgeGate from "../components/AgeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sour San Jerónimo",
  description:
    "Un sour premium con historia. Pisco sour artesanal elaborado con receta tradicional.",
  openGraph: {
    title: "Sour San Jerónimo",
    description: "Un sour premium con historia. Pisco sour artesanal.",
    siteName: "Sour San Jerónimo",
    images: [
      {
        url: "/Botella.png",
        width: 800,
        height: 800,
        alt: "Botella de Sour San Jerónimo",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <AgeGate />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}