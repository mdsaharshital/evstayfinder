import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "component/Navbar";
import Footer from "component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EV Stay Finder - Discover EV-Friendly Hotels in the U.S.",
  description:
    "EV Stay Finder helps you find hotels with EV charging options across popular U.S. cities. Plan your travel and stay with ease at EV-friendly hotels.",
  openGraph: {
    title: "EV Stay Finder - Discover EV-Friendly Hotels in the U.S.",
    description:
      "Find handpicked EV-friendly hotels with charging stations in top U.S. cities. Browse, book, and stay charged during your travels.",
    url: "https://evstayfinder.vercel.app", // Replace with your actual site URL
    siteName: "EV Stay Finder",
    images: [
      {
        url: "https://evstayfinder.vercel.app/images/evstayfinder.png", // Ensure this path is correct
        width: 800,
        height: 800,
        alt: "EV Stay Finder Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@evstayfinder", // Your Twitter handle, if applicable
    title: "EV Stay Finder - Discover EV-Friendly Hotels in the U.S.",
    description:
      "EV Stay Finder helps you find hotels with EV charging options across popular U.S. cities. Plan your travel and stay with ease.",
    images: ["https://evstayfinder.vercel.app/images/evstayfinder.png"], // Ensure this path is correct
  },
};

// Safeguard: Check if `image` URL is available before trying to use it in JSON
const safeImageUrl = "https://evstayfinder.vercel.app/images/evstayfinder.png"; // Fallback image URL

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="VUkRt9LNAhJml89S-DO4ie7TM0Sgy4jH93I5aBzQs6g"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
