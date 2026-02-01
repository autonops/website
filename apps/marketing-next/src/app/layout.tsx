import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider, Navbar, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Autonops - Migration as a Service", template: "%s | Autonops" },
  description: "InfraIQ: DevOps automation platform. Migrate from Heroku to AWS in hours, not months.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-16x16.png", sizes: "16x16" }, { url: "/favicon-32x32.png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CKLHH71XSK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CKLHH71XSK');
          `}
        </Script>
        {/* Theme detection */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{const t=localStorage.getItem('theme');const s=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&s)){document.documentElement.classList.add('dark')}}catch(e){}})();` }} />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-50 transition-colors min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
