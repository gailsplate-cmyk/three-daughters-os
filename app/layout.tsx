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
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/quote-request", label: "Get Quote", accent: true },
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
        <header className="site-header border-b border-black/10 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
            <Link href="/" className="font-semibold text-lg">
              Three Daughters
            </Link>
            <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${link.accent ? 'text-[var(--accent)] font-semibold' : 'hover:opacity-70'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="md:hidden">
              <Link href="/quote-request" className="text-sm font-semibold text-[var(--accent)]">
                Get Quote
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto flex w-full max-w-6xl flex-1 px-5 py-10 md:px-8">
          {children}
        </main>
        <footer className="border-t border-black/10 bg-white/80">
          <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <article>
                <p className="font-semibold">Three Daughters Landscaping</p>
                <p className="mt-2 text-sm text-black/70">
                  Professional property care built on consistency and transparency.
                </p>
              </article>
              <article>
                <p className="font-semibold text-sm">Quick Links</p>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li><a href="/services" className="hover:opacity-70">Services</a></li>
                  <li><a href="/quote-request" className="hover:opacity-70">Request Quote</a></li>
                  <li><a href="/about" className="hover:opacity-70">About</a></li>
                </ul>
              </article>
              <article>
                <p className="font-semibold text-sm">Contact</p>
                <p className="mt-3 text-sm text-black/70">(555) 123-4567</p>
                <p className="text-sm text-black/70">hello@threedaughters.com</p>
              </article>
            </div>
            <div className="mt-8 border-t border-black/10 pt-6 text-center text-sm text-black/60">
              <p>© 2026 Three Daughters Landscaping. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
