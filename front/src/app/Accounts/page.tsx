'use client';

import { AuthContext } from '~/context/auth/AuthContext';

import { ResumeFinance } from '~/components/ResumeFinance';
import { ListAccount } from '~/components/List';
import { ProhibitedModal } from '~/components/ui/ProhibitedModal';
import { ExitModal } from '~/components/ui/ExitModal';

import { api } from '~/services/Api';
import { useContext, useState } from 'react';

import { GrAdd, GrSubtract } from 'react-icons/gr';

export default function Accounts() {
  const { dataAccount } = useContext(AuthContext);

  const [isOpenProhibited, setIsOpenProhibited] = useState(false);
  const [isOpenExist, setIsOpenExist] = useState(false);

  //const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);

  async function handleDeleteTransaction(id: string) {
    await api.delete('inovoice/delete', {
      params: {
        id: id
      }
    });

    //listLoading();
  }

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
