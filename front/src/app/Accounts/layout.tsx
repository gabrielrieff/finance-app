'use client';

import { Header } from '~/components/ui/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <title>Minhas Contas</title>
      <body className="h-screen">
        <main className="h-full flex flex-col justify-start gap-9">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
