/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { billsProps } from '~/@types/bills';
import {
  SignInProps,
  SignUpProps,
  UserProps,
  newInovoiceProps
} from '~/@types/context';
import { api } from '~/services/Api';

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  addAccount: (credentials: newInovoiceProps) => Promise<void>;
  allInovoices: () => Promise<Array<billsProps>>;
  filterInovoices: () => Promise<Array<billsProps>>;
  dataAccount: Array<billsProps>;
  allAccount: Array<billsProps>;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps>();
  const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);
  const [allAccount, setallAccount] = useState<Array<billsProps>>([]);
  const isAuthenticated = !!user;

  const { push } = useRouter();

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      api
        .get('/detail')
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({
            id,
            name,
            email
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      filterInovoices();
      allInovoices();
    }
  }, []);

  async function signOut() {
    try {
      destroyCookie(undefined, '@nextauth.token');
      push('/');
    } catch {
      console.log('Error singOut');
    }
  }

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('session', {
        email,
        password
      });

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, //expira em 30 dias
        path: '/'
      });

      setUser({
        id,
        name,
        email
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      push('/dashboard');
    } catch (err) {
      /* empty */
    }
  }

  async function allInovoices() {
    const inovoice = await api.get('inovoice/all');
    setallAccount(inovoice.data);
    return allAccount;
  }

  async function filterInovoices() {
    const inovoice = await api.get('inovoice/all');

    const filterInovoice = inovoice.data.filter(
      (account: billsProps) =>
        new Date(account.created_at).getMonth() === new Date().getMonth()
    );

    setDataAccount(filterInovoice);
    console.log('foi chamado');

    return dataAccount;
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/users', {
        name,
        email,
        password
      });

      push('/');
    } catch (err) {
      /* empty */
    }
  }

  async function addAccount({
    description,
    value,
    type,
    category_id
  }: newInovoiceProps) {
    try {
      const response = await api.post('/inovoice', {
        description,
        value,
        type,
        category_id
      });
    } catch (err) {
      /* empty */
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        signUp,
        addAccount,
        allInovoices,
        filterInovoices,
        dataAccount,
        allAccount
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
