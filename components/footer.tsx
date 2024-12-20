"use client";

interface FooterProps {
  lang: string;
}

export function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();
  const text = lang === 'de' 
    ? {
        builtWith: 'Erstellt mit Next.js und Tailwind CSS',
        copyright: `© ${year} QR-Code Generator. Alle Rechte vorbehalten.`,
        createdBy: 'Erstellt von'
      }
    : {
        builtWith: 'Built with Next.js and Tailwind CSS',
        copyright: `© ${year} QR Code Generator. All rights reserved.`,
        createdBy: 'Created by'
      };

  return (
    <footer className="border-t-2 border-primary/20 py-6 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground text-center">
          <p>{text.builtWith}</p>
          <p className="mt-1">{text.copyright}</p>
          <p className="mt-2">
            {text.createdBy}{' '}
            <a 
              href="https://github.com/onivue" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Albin Hoti
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}