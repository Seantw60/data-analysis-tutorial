import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Quality Analysis",
  description: "AI-powered dataset quality inspection and reporting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-100`}>
        {/* Top Navigation */}
        <header className="w-full bg-white shadow-sm py-4">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <div className="font-semibold text-lg">📊 Data Quality Analysis</div>

            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/analysis/preview" className="hover:underline">
                Preview
              </a>
              <a href="/analysis/results" className="hover:underline">
                Results
              </a>
              <a href="/analysis/details" className="hover:underline">
                Details
              </a>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="pt-8 pb-20">{children}</main>
      </body>
    </html>
  );
}
