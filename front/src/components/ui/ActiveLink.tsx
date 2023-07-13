'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type activeLinkPros = {
  children: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function ActiveLink({ href, children, ...rest }: activeLinkPros) {
  const pathname = usePathname();

  const isCurrentPath = pathname === href || pathname === rest.as;

  return (
    <Link
      {...rest}
      href={href}
      style={{ borderBottom: `${isCurrentPath ? '3px solid #ffca00' : ''} ` }}
    >
      {children}
    </Link>
  );
}
