import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Three Daughters Landscaping",
    template: "%s | Three Daughters Landscaping",
  },
  description:
    "Professional landscaping services with fast quote requests and dependable property care.",
  keywords: [
    "landscaping",
    "lawn care",
    "yard maintenance",
    "landscape cleanup",
    "mulching",
    "quote request",
  ],
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/quote-request", label: "Quote Request" },
  { href: "/contact", label: "Contact" },
  { href: "/hub", label: "Business Hub" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <header className="site-header">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Three Daughters Landscaping
            </Link>
            <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:opacity-70">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <nav className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-5 pb-4 text-xs font-medium md:hidden md:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-black/10 bg-white/80 px-3 py-1.5 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
          {children}
        </main>
        <footer className="border-t border-black/10 bg-white/80">
          <div className="mx-auto w-full max-w-6xl px-5 py-4 text-sm text-black/70 md:px-8">
            Three Daughters Landscaping · Reliable service and clear communication.
          </div>
        </footer>
      </body>
    </html>
  );
}
