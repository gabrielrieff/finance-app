'use client';

import { ResumeFinance } from '~/components/ResumeFinance';

import { categorysProps } from '~/@types/category';
//import { resultProps } from '~/@types/result';
import { api } from '~/services/Api';
import { ListAccount } from '~/components/List';
import { useEffect, useState } from 'react';

import { GrAddCircle } from 'react-icons/gr';
import { HandleModal } from '~/components/ui/isModal';

export type modalNewInovoice = {
  description: string;
  value: number;
  type: boolean;
  category_id: string;
};

export type editOrderProps = {
  id: string;
  description?: string;
  value?: number;
  type?: boolean;
};

export interface billsProps {
  category_id: string;
  id: string;
  value: number;
  type: boolean;
  description: string;
  created_at: number;
  category: categorysProps;
}

interface resumeAccountsProps {
  saida: number;
  entrada: number;
}
export default function Accounts() {
  const [isOpen, setIsOpen] = useState(false);

  const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);
  const [resumeAccount, setResumeAccount] = useState<resumeAccountsProps>({
    entrada: 0,
    saida: 0
  });

  async function handleDeleteTransaction(id: string) {
    await api.delete('inovoice/delete', {
      params: {
        id: id
      }
    });

    //listLoading();
  }

  async function Inovoices() {
    const inovoice = await api.get('inovoice/all');
    return setDataAccount(inovoice.data);
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
    Inovoices();
  }, []);

  useEffect(() => {
    setResumeAccount(resumeAccounts());
  }, [dataAccount]);

  function handleOpenModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <main className="flex min-w-screen flex-col items-center justify-center gap-[20px]">
        <ResumeFinance resumeAccounts={resumeAccount} />

        <button
          onClick={handleOpenModal}
          className="text-black flex justify-start items-center rounded-md
         h-[30px] w-[95%] max-w-[1120px] p-[10px] duration-[0.3s] hover:text-white hover:bg-green-400"
        >
          <GrAddCircle size={20} />
          <span className="ml-2">Adicionar novo valor!</span>
        </button>

        <ListAccount
          Accounts={dataAccount}
          handleFinishTransaction={handleDeleteTransaction}
        />

        <HandleModal isOpen={isOpen} onRequestClose={handleOpenModal} />
      </main>
    </>
  );
}
