import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conexpet | Logística y Transporte de Carga Pesada en Ecuador",
  description:
    "Conexpet: transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador. Flota propia, certificaciones internacionales y cobertura nacional. Lago Agrio, Sucumbíos.",
  keywords: [
    "transporte carga pesada Ecuador",
    "transporte petrolero",
    "vacuum crudo",
    "izaje grúas",
    "logística Ecuador",
    "Conexpet",
    "transporte fluidos",
    "Lago Agrio",
    "Sucumbíos",
  ],
  authors: [{ name: "Conexpet" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    title: "Conexpet | Logística y Transporte de Carga Pesada",
    description:
      "Transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador. Flota propia y cobertura nacional.",
    url: "https://conexpet.com",
    siteName: "Conexpet",
    locale: "es_EC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conexpet | Logística y Transporte de Carga Pesada",
    description:
      "Transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador.",
    site: "@Conexpet",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-EC" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Conexpet",
              url: "https://conexpet.com",
              logo: "https://conexpet.com/images/logo.png",
              description:
                "Transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Vía Tarapoa Lote 5 S/N y Kilómetro 11 1/2",
                addressLocality: "Lago Agrio",
                addressRegion: "Sucumbíos",
                addressCountry: "EC",
              },
              telephone: "+593023956540",
              email: "conexpet@conexpet.com",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
