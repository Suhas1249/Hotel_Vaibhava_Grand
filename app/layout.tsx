import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Hotel Vaibhava Grand | Boarding, Lodging & Function Hall in Chitradurga',
  description:
    'Book clean and comfortable AC & Non-AC rooms at Hotel Vaibhava Grand on Turuvanuru Road, Chitradurga. Features 24-hr hot water, free parking, generator backup, and an elegant Function Hall.',
  keywords:
    'hotel vaibhava grand, vaibhava grand chitradurga, lodges in chitradurga, boarding and lodging chitradurga, function hall chitradurga, room rent chitradurga, book rooms chitradurga',
  authors: [{ name: 'Hotel Vaibhava Grand' }],
  creator: 'Hotel Vaibhava Grand',
  publisher: 'Hotel Vaibhava Grand',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hotel-vaibhava-grand.com',
    title: 'Hotel Vaibhava Grand | Boarding & Lodging Chitradurga',
    description: 'Book premium AC & Non-AC rooms with 24-hr hot water and generator backup, and check out our elegant Function Hall.',
    siteName: 'Hotel Vaibhava Grand',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4ECDC4" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-white text-gray-900">
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
