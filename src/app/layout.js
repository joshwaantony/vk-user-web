

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider";
import { absoluteUrl, seoConfig } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s`,
  },
  description: seoConfig.defaultDescription,
  applicationName: seoConfig.siteName,
  keywords: [
    "vk accountancy",
    "online accountancy course",
    "commerce classes",
    "accounting lessons",
    "kerala online learning",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    type: "website",
    images: [
      {
        url: absoluteUrl("/logo.svg"),
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [absoluteUrl("/logo.svg")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Razorpay SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* ✅ Toast */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
          }}
        />

        {/* ✅ Auth Initialization */}
        <AuthProvider>

        {/* ✅ App Content */}
        {children}
      </AuthProvider>
      
      </body>
    </html>
  );
}
