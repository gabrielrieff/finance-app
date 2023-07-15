'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '~/context/auth/AuthContext';

import { BoxValeus } from './Box';
import { billsProps } from '~/@types/bills';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoIosAdd } from 'react-icons/io';
import { resumeAccountsProps } from './@type';
import { ProhibitedModal } from '../ui/ProhibitedModal';

export function ResumeFinance() {
  const { dataAccount } = useContext(AuthContext);

  const [isOpenProhibited, setIsOpenProhibited] = useState(false);
  const [resumeAccount, setResumeAccount] = useState<resumeAccountsProps>({
    entrada: 0,
    saida: 0
  });

  const { saida, entrada } = resumeAccount;
  const calcSaldo = entrada - saida;

  const [showValue, setShowValue] = useState(true);
  const resumeAccounts = (data: Array<billsProps>) => {
    let soma = 0;
    let sub = 0;

    data.map((account) => {
      if (account.type === false) {
        sub += account.value;
      } else {
        soma += account.value;
      }
    });
    return { entrada: soma, saida: sub };
  };

  useEffect(() => {
    setResumeAccount(resumeAccounts(dataAccount));
  }, [dataAccount]);

  function handleOpenModalProhibited() {
    setIsOpenProhibited(!isOpenProhibited);
  }

  return (
    <>
      <div className="flex w-[95%] max-w-[1120px] bg-white rounded-[10px] shadow-xl">
        <div className="w-full py-[40px] px-[20px]">
          <div className="flex items-center justify-evenly gap-[20px]">
            <div className="flex items-center justify-center">
              <div className="flex flex-col text-black items-center w-[162px]">
                <div>saldo geral</div>
                <div className="text-[2rem] font-semibold flex justify-center items-center">
                  <span>R$</span>
                  <span>{!showValue ? calcSaldo.toFixed(2) : '******'}</span>
                </div>
              </div>
              <div>
                <button onClick={() => setShowValue(!showValue)}>
                  {!showValue ? (
                    <AiFillEyeInvisible size={32} />
                  ) : (
                    <AiFillEye size={32} />
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={handleOpenModalProhibited}
              className="p-2 cursor-pointer border-zinc-800
            rounded-md border-[3px] border-solid hover:bg-zinc-600 duration-[0.3s]
          hover:border-zinc-300 hover:text-white"
            >
              <IoIosAdd size={45} />
            </button>
          </div>
          <div className="flex gap-[20px]">
            <BoxValeus
              title="Receita mensal"
              showValue={showValue}
              color="#49aa26"
              value={entrada.toFixed(2)}
            />
            <BoxValeus
              title="Despesas mensal"
              showValue={showValue}
              color="#ff0000"
              value={saida.toFixed(2)}
            />
          </div>
        </div>
        <ProhibitedModal
          isOpen={isOpenProhibited}
          onRequestClose={handleOpenModalProhibited}
        />
      </div>
    </>
  );
}
