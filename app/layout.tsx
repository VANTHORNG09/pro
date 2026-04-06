import type { Metadata } from "next";
import { Inter, Poppins, Geist,Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClientProviders } from "@/components/providers/client-providers";

import "./globals.css";
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AssignBridge",
  description: "Smart assignment management platform",
  openGraph: {
    title: "AssignBridge",
    description: "Smart assignment management platform",
    url: "https://assignbridge.vercel.app",
    siteName: "AssignBridge",
    images: [
      {
        url: "https://assignbridge.vercel.app/assignbridge-metadata-image.png",
        width: 1200,
        height: 630,
        alt: "AssignBridge Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssignBridge",
    description: "Smart assignment management platform",
    images: [
      {
        url: "https://assignbridge.vercel.app/assignbridge-metadata-image.png",
        width: 1200,
        height: 630,
        alt: "AssignBridge Twitter Card Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        poppins.className,
        inter.className,
        "font-sans",
        geist.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}



