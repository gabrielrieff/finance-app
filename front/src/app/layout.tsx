'use client';
import PrivateRoute from '~/components/PrivateRouter';
import PublicRoute from '~/components/PublicRouter';

import { checkedRouter } from '~/utils/checkedRouter';

import { usePathname } from 'next/navigation';
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
  const router = usePathname();

  const isPublicPage = checkedRouter(router);

  return (
    <html lang="pt-BR">
      <body className="h-screen" suppressHydrationWarning={true}>
        <div id="__next">
          <AuthProvider>
            {isPublicPage && <PublicRoute>{children}</PublicRoute>}
            {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
