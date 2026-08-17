import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "Conexpet | Logística y Transporte de Carga Pesada en Ecuador",
  description:
    "Conexpet: más de 15 años de transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador. Flota propia de 50+ vehículos, certificaciones internacionales. Lago Agrio, Sucumbíos.",
  keywords: [
    "transporte carga pesada Ecuador",
    "transporte petrolero",
    "vacuum crudo",
    "izaje grúas",
    "logística Ecuador",
    "Conexpet",
    "transporte fluidos perforación",
    "Lago Agrio",
    "Sucumbíos",
    "servicio transporte petrolero Ecuador",
    "carga extrapesada",
    "grúas 120 toneladas",
  ],
  authors: [{ name: "Conexpet" }],
  creator: "Conexpet",
  publisher: "Conexpet",
  icons: {
    icon: "/images/favicon.ico",
  },
  metadataBase: new URL("https://conexpet.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Conexpet | Logística y Transporte de Carga Pesada",
    description:
      "Transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador. Flota propia de 50+ vehículos y cobertura nacional.",
    url: "https://conexpet.com",
    siteName: "Conexpet",
    locale: "es_EC",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Conexpet - Logística y Transporte de Carga Pesada en Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conexpet | Logística y Transporte de Carga Pesada",
    description:
      "Transporte de carga pesada, vacuum e izaje en el sector petrolero de Ecuador.",
    site: "@Conexpet",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Combined Schema.org: Organization + LocalBusiness + Service
const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://conexpet.com/#organization",
      name: "Conexpet",
      url: "https://conexpet.com",
      logo: "https://conexpet.com/images/logo.png",
      description:
        "Empresa líder en logística y transporte de carga pesada para el sector petrolero en Ecuador",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vía Tarapoa Lote 5 S/N y Kilómetro 11 1/2",
        addressLocality: "Lago Agrio",
        addressRegion: "Sucumbíos",
        addressCountry: "EC",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+593-02-3956540",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+593991234567",
          contactType: "sales",
          availableLanguage: ["Spanish"],
        },
      ],
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://conexpet.com/#localbusiness",
      name: "Conexpet",
      image: "https://conexpet.com/images/og-image.jpg",
      telephone: "+593-02-3956540",
      email: "conexpet@conexpet.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vía Tarapoa Lote 5 S/N y Kilómetro 11 1/2",
        addressLocality: "Lago Agrio",
        addressRegion: "Sucumbíos",
        postalCode: "210102",
        addressCountry: "EC",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 0.0833,
        longitude: -76.8833,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "06:00",
        closes: "18:00",
      },
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "47",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://conexpet.com/#website",
      url: "https://conexpet.com",
      name: "Conexpet",
      publisher: { "@id": "https://conexpet.com/#organization" },
      inLanguage: "es-EC",
    },
    {
      "@type": "Service",
      name: "Transporte de Fluidos (Vacuum)",
      description:
        "Movilización de crudo, aguas residuales y agua fresca con equipos tipo vacuum de alta capacidad hasta 200 barriles.",
      provider: { "@id": "https://conexpet.com/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Ecuador",
      },
      serviceType: "Transporte de fluidos industriales",
    },
    {
      "@type": "Service",
      name: "Carga Pesada y Contenedores",
      description:
        "Transporte de taladros (RIGs), maquinaria pesada, tuberías, bombas y contenedores secos y refrigerados.",
      provider: { "@id": "https://conexpet.com/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Ecuador",
      },
      serviceType: "Transporte de carga extrapesada",
    },
    {
      "@type": "Service",
      name: "Izaje y Montaje",
      description:
        "Grúas de hasta 120 toneladas para maniobras de izaje seguras y precisas.",
      provider: { "@id": "https://conexpet.com/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Ecuador",
      },
      serviceType: "Servicio de izaje industrial",
    },
    {
      "@type": "Service",
      name: "Talleres y Mantenimiento",
      description:
        "Talleres propios con mantenimiento preventivo y correctivo, repuestos certificados.",
      provider: { "@id": "https://conexpet.com/#organization" },
      areaServed: {
        "@type": "Country",
        name: "Ecuador",
      },
      serviceType: "Mantenimiento de flota pesada",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-EC" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
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
