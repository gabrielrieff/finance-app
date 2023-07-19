'use client';

import { Header } from '~/components/ui/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <title>Dashboard</title>
      <body className="h-screen">
        <div id="__next" className="h-full flex flex-col justify-start gap-9">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
