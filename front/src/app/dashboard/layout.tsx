'use client';

import { Header } from '~/components/ui/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="h-full flex flex-col justify-between">
        <Header />
        {children}
      </body>
    </html>
  );
}
