'use client';

import { ResumeFinance } from '~/components/ResumeFinance';

import { categorysProps } from '~/@types/category';
//import { resultProps } from '~/@types/result';
import { api } from '~/services/Api';
import { ListAccount } from '~/components/List';
import { useEffect, useState } from 'react';

import { GrAdd, GrSubtract } from 'react-icons/gr';
import { ProhibitedModal } from '~/components/ui/ProhibitedModal';
import { ExitModal } from '~/components/ui/ExitModal';

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

export default function Accounts() {
  const [isOpenProhibited, setIsOpenProhibited] = useState(false);
  const [isOpenExist, setIsOpenExist] = useState(false);

  const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);

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

  useEffect(() => {
    Inovoices();
  }, []);

  function handleOpenModalProhibited() {
    setIsOpenProhibited(!isOpenProhibited);
  }

  function handleOpenModalExit() {
    setIsOpenExist(!isOpenExist);
  }
  return (
    <>
      <main className="flex min-w-screen flex-col items-center justify-center gap-[20px]">
        <ResumeFinance />

        <button
          onClick={handleOpenModalProhibited}
          className="text-black flex justify-start items-center rounded-md
         h-[30px] w-[95%] max-w-[1120px] p-[10px] duration-[0.3s] hover:text-white hover:bg-green-400"
        >
          <GrAdd size={20} />
          <span className="ml-2">Adicionar receita!</span>
        </button>

        <button
          onClick={handleOpenModalExit}
          className="text-black flex justify-start items-center rounded-md
         h-[30px] w-[95%] max-w-[1120px] p-[10px] duration-[0.3s] hover:text-white hover:bg-red-400"
        >
          <GrSubtract size={20} />
          <span className="ml-2">Adicionar despesa!</span>
        </button>

        <ListAccount
          Accounts={dataAccount}
          handleFinishTransaction={handleDeleteTransaction}
        />

        <ProhibitedModal
          isOpen={isOpenProhibited}
          onRequestClose={handleOpenModalProhibited}
        />
        <ExitModal isOpen={isOpenExist} onRequestClose={handleOpenModalExit} />
      </main>
    </>
  );
}
