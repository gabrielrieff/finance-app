'use client';

import { useContext } from 'react';
import { AuthContext } from '~/context/auth/AuthContext';

import { LinkHome } from './LinkHome';
import { ActiveLink } from './ActiveLink';
import { FaPowerOff } from 'react-icons/fa';

export function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className="w-full justify-center bg-[#994fab]">
      <div className="w-full h-[70px] flex items-center justify-around">
        <div>
          <LinkHome />
        </div>
        <nav className="flex h-full justify-center items-center">
          <div className="text-white flex justify-center items-center h-full gap-[30px]">
            <ActiveLink
              className="hover:text-[#ffca00] duration-[0.5s]"
              href={'/dashboard'}
            >
              Visão geral
            </ActiveLink>
            <ActiveLink
              className="hover:text-[#ffca00] duration-[0.5s]"
              href={'/Accounts'}
            >
              Lançamentos
            </ActiveLink>
            <button onClick={signOut}>
              <FaPowerOff
                size={30}
                className="text-white hover:text-black duration-[0.5s]"
              />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
