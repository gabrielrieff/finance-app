'use client';

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { useEffect, useState } from 'react';
import { BoxValeus } from './Box';
import { ProgressBar } from '../ProgressBar';
import { billsProps } from '~/@types/bills';
import { api } from '~/services/Api';

interface resumeAccountsProps {
  saida: number;
  entrada: number;
}

export function ResumeFinance() {
  const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);
  const [resumeAccount, setResumeAccount] = useState<resumeAccountsProps>({
    entrada: 0,
    saida: 0
  });

  const { saida, entrada } = resumeAccount;
  const calcSaldo = entrada - saida;

  const progress = Math.round(0);
  const [showValue, setShowValue] = useState(true);

  async function inovoicesAll() {
    try {
      const inovoice = await api.get('inovoice/all');
      const data = inovoice.data;

      const filterInovoice = data.filter(
        (account: billsProps) =>
          new Date(account.created_at).getMonth() === new Date().getMonth()
      );

      setDataAccount(filterInovoice);
      return;
    } catch (err) {
      console.log(err);
    }
  }

  const resumeAccounts = () => {
    let soma = 0;
    let sub = 0;

    dataAccount.map((account) => {
      if (account.type === false) {
        sub += account.value;
      } else {
        soma += account.value;
      }
    });
    return { entrada: soma, saida: sub };
  };

  useEffect(() => {
    inovoicesAll();
  }, []);

  useEffect(() => {
    setResumeAccount(resumeAccounts());
  }, [dataAccount]);

  return (
    <div className="flex w-[95%] max-w-[1120px] bg-white rounded-[10px] shadow-xl">
      <div className="w-full py-[40px] px-[20px]">
        <div className="flex items-center justify-center gap-[20px]">
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
          <div style={{ display: 'contents' }}>
            <ProgressBar progress={progress} bgColor={'red'} />
          </div>
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
    </div>
  );
}
