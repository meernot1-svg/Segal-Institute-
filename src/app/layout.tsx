import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { branding } from "@/lib/branding";
import { SITE_URL } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const keywords = [
  "learn English verbs",
  "English verb forms",
  "V1 V2 V3 verbs",
  "irregular verbs practice",
  "English academy Pakistan",
  "learn English in Lahore",
  "English learning app",
  "verb flashcards",
  "MCQ English test",
  "AI English tutor",
  "Segal Institute",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${branding.name} — ${branding.tagline}`,
    template: `%s · ${branding.name}`,
  },
  description: branding.description,
  keywords,
  applicationName: branding.name,
  authors: [{ name: branding.name }],
  creator: branding.name,
  publisher: branding.name,
  // Self-canonical — every page inherits this unless overridden.
  alternates: { canonical: "/" },
  icons: { icon: "/logo.svg", shortcut: "/logo.svg", apple: "/logo.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: branding.name,
    title: `${branding.name} — ${branding.tagline}`,
    description: branding.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${branding.name} — ${branding.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${branding.name} — ${branding.tagline}`,
    description: branding.description,
    images: ["/og-image.png"],
    creator: "@segalinstitute",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e2a52",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${hanken.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
