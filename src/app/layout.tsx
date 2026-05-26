import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri, Great_Vibes, Cormorant_Garamond, Noto_Nastaliq_Urdu } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });
const amiri = Amiri({ variable: "--font-amiri", weight: ["400","700"], subsets: ["arabic","latin"], display: "swap" });
const greatVibes = Great_Vibes({ variable: "--font-great-vibes", weight: "400", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", weight: ["400","600","700"], subsets: ["latin"], display: "swap" });
const urduFont = Noto_Nastaliq_Urdu({ variable: "--font-urdu", weight: ["400","700"], subsets: ["arabic"], display: "swap" });

export const metadata: Metadata = {
  title: "Eid ul Adha Mubarak — Create & Share Greeting Cards",
  description: "Create beautiful personalized Eid ul Adha greeting cards. Customize with your name, download as JPG, and share with family and friends.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${amiri.variable} ${greatVibes.variable} ${cormorant.variable} ${urduFont.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
