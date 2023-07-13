import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  styles?: string;
}

export function Button({ styles, loading, children, ...rest }: ButtonProps) {
  const style = twMerge('px-6 py-2 duration-[0.5s]', styles);

  return (
    <button className={style} disabled={loading} {...rest}>
      {loading ? <FaSpinner color="#FFF" size={26} /> : <a>{children}</a>}
    </button>
  );
}
