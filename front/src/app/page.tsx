/* eslint-disable react/no-unescaped-entities */
'use client';

import { FormEvent, useContext, useState } from 'react';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import Link from 'next/link';
import { AuthContext } from '~/context/auth/AuthContext';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      return;
    }

    setLoading(false);

    const data = {
      email: email,
      password: password
    };

    await signIn(data);
  }

  return (
    <main>
      <form
        onSubmit={handleLogin}
        className="flex min-h-screen flex-col items-center justify-center p-24 gap-[20px]"
      >
        <Input
          placeholder="Email"
          type={'email'}
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          loading={loading}
          styles="font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-[20px]"
        >
          Login
        </Button>

        <Link href={'/signUp'} className="hover:text-blue-500 duration-[0.5s]">
          Don't have a registration? Register
        </Link>
      </form>
    </main>
  );
}
