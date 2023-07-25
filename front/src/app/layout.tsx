'use client';
import { AuthProvider } from '~/context/auth/AuthContext';

import './globals.css';

export const metadata = {
  title: 'Finance App',
  description: 'my app finance controller'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
