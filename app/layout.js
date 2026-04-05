import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Advanced Dental Care",
  description: "Experience premium, state-of-the-art dental care at our digital clinic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
