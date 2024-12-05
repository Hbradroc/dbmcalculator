import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Mail, Linkedin } from 'lucide-react'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DBM Calculator",
  description: "DBM Coil Calculator Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-2 right-4 flex items-center gap-2 text-gray-600 z-50">
          <a 
            href="mailto:hbradroc@uwo.ca" 
            className="flex items-center hover:text-gray-900 transition-colors"
            title="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a 
            href="https://linkedin.com/in/harrybradrocco" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center hover:text-gray-900 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
