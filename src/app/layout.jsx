import './globals.css';

export const metadata = {
  title: 'ZARYA VAULT | Expert en Montres de Luxe (Rolex, Audemars Piguet)',
  description: "Découvrez ZARYA VAULT, votre cabinet d'expertise horlogère privé. Accès exclusif aux montres d'investissement les plus rares (Rolex Daytona, Patek Philippe, Audemars Piguet).",
  keywords: 'montre de luxe, expert rolex, audemars piguet, patek philippe, investissement montre, sourcing montre, achat montre luxe',
  authors: [{ name: 'ZARYA VAULT' }],
  openGraph: {
    title: 'ZARYA VAULT | Expertise Privée en Haute Horlogerie',
    description: "L'excellence horlogère. Sourcing, expertise et acquisition de pièces exclusives hors-marché.",
    url: 'https://www.zarya.fr',
    siteName: 'ZARYA VAULT',
    images: [
      {
        url: 'https://www.zarya.fr/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZARYA VAULT | Expertise Horlogère',
    description: 'Le partenaire exclusif pour vos investissements en Haute Horlogerie.',
    images: ['https://www.zarya.fr/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" href="/logo.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "ZARYA VAULT",
              "image": "https://www.zarya.fr/logo.png",
              "url": "https://www.zarya.fr",
              "telephone": "+33100000000",
              "priceRange": "$$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Paris",
                "addressLocality": "Paris",
                "postalCode": "75008",
                "addressCountry": "FR"
              },
              "description": "Cabinet privé de conseil, sourcing et expertise en Haute Horlogerie. Accès exclusif aux montres d'investissement.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
