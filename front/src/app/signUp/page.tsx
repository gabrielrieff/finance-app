/* eslint-disable react/no-unescaped-entities */
'use client';

import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';

import { AuthContext } from '~/context/auth/AuthContext';

import Link from 'next/link';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || password === '') {
      return;
    }

    setLoading(false);

    const data = {
      name,
      email,
      password
    };

    await signUp(data);

    setLoading(true);
  }

  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>

      <div className="">
        <form
          onSubmit={handleSignUp}
          className="flex min-h-screen flex-col items-center justify-center p-24 gap-[20px]"
        >
          <Input
            placeholder="Name"
            type={'text'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Email"
            type={'email'}
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
            styles="font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-[20px]"
            type={'submit'}
            loading={loading}
          >
            registration
          </Button>

          <Link href={'/'} className="hover:text-blue-500 duration-[0.5s]">
            Already have a registration? log in
          </Link>
        </form>
      </div>
    </>
  );
}
