'use client';

import { usePathname } from 'next/navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import { checkedRouter } from '~/utils/checkedRouter';
import PrivateRoute from '~/components/PrivateRouter';
import { AuthProvider } from '~/context/auth/AuthContext';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body className={`${inter.className} h-screen`}>
        <AuthProvider>
          {isPublicPage && <>{children}</>}
          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        </AuthProvider>
      </body>
    </html>
  );
}
