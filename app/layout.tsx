import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { negocioSchema } from "@/lib/schema";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["400","500","600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://centroanidar.cl";
const TITLE = "Anidar Centro Terapéutico en Talca | Fonoaudiología, TO, Psicología y Psicopedagogía";
const DESCRIPTION =
  "Centro terapéutico en Talca con atención en Fonoaudiología, Terapia Ocupacional, Psicología y Psicopedagogía para niños, adolescentes y adultos. Agenda tu hora online.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Anidar Centro Terapéutico",
  },
  description: DESCRIPTION,
  keywords: [
    "centro terapéutico Talca",
    "fonoaudiología Talca",
    "terapia ocupacional Talca",
    "psicología infantil Talca",
    "psicopedagogía Talca",
    "estimulación temprana Talca",
    "integración sensorial",
    "rehabilitación neurológica Talca",
  ],
  authors: [{ name: "Anidar Centro Terapéutico" }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: SITE_URL,
    siteName: "Anidar Centro Terapéutico",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(negocioSchema) }}
        />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-body`}>
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
