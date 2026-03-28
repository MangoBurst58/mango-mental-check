import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

// Base URL untuk metadata
const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

// Query string version - ubah angka ini jika ingin paksa update favicon
const faviconVersion = "v=2";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Mango Mental Check",
  description: "Screening kesehatan mental dengan kuesioner ilmiah PHQ-9 & GAD-7",
  
  // ICONS - gunakan nama file yang benar: favicon-new
  icons: {
    icon: [
      {
        url: `/favicon-new.svg?${faviconVersion}`,
        type: "image/svg+xml",
      },
      {
        url: `/favicon-new.ico?${faviconVersion}`,
        sizes: "any",
      },
    ],
    apple: {
      url: `/apple-touch-icon.png?${faviconVersion}`,
      sizes: "180x180",
    },
  },
  
  // MANIFEST
  manifest: `/site.webmanifest?${faviconVersion}`,
  
  // OPEN GRAPH
  openGraph: {
    title: "Mango Mental Check",
    description: "Screening kesehatan mental dengan kuesioner ilmiah PHQ-9 & GAD-7",
    type: "website",
    locale: "id_ID",
    siteName: "Mango Mental Check",
    images: [
      {
        url: `/og-image.png?${faviconVersion}`,
        width: 1200,
        height: 630,
        alt: "Mango Mental Check",
      },
    ],
  },
  
  // TWITTER
  twitter: {
    card: "summary_large_image",
    title: "Mango Mental Check",
    description: "Screening kesehatan mental dengan kuesioner ilmiah PHQ-9 & GAD-7",
    images: [`/og-image.png?${faviconVersion}`],
  },
  
  // ROBOTS
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Favicon dengan nama file yang benar */}
        <link rel="icon" href={`/favicon-new.svg?${faviconVersion}`} type="image/svg+xml" />
        <link rel="shortcut icon" href={`/favicon-new.ico?${faviconVersion}`} />
        <link rel="apple-touch-icon" href={`/apple-touch-icon.png?${faviconVersion}`} />
        
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}