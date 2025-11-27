import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Cast Minter - Mint Your Farcaster Casts as NFTs",
  description: "Turn your memorable Farcaster moments into unique NFTs on Base using Zora",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Cast Minter",
    description: "Mint your Farcaster casts as NFTs",
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image`,
    "fc:frame:button:1": "Launch App",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": process.env.NEXT_PUBLIC_APP_URL || "https://cast-minter.vercel.app",
  },
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
