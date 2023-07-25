import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...rest }: InputProps) {
  return (
    <input
      className="p-3 rounded-lg w-[70%] border border-gray-300 border-solid"
      {...rest}
    />
  );
}
