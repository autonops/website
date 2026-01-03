import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'InfraIQ Dashboard',
    template: '%s | InfraIQ',
  },
  description: 'DevOps automation platform. Visualize scans, track migrations, and manage compliance.',
  keywords: ['devops', 'infrastructure', 'migration', 'terraform', 'aws', 'heroku'],
  authors: [{ name: 'Autonops' }],
  creator: 'Autonops',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Prevent flash of wrong theme */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const savedTheme = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else if (systemDark) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                })();
              `,
            }}
          />
        </head>
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
