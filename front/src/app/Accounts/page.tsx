'use client';

import { AuthContext } from '~/context/auth/AuthContext';
import { api } from '~/services/Api';
import { useContext, useState } from 'react';

import { ResumeFinance } from '~/components/ResumeFinance';
import { ListAccount } from '~/components/List';
import { ProhibitedModal } from '~/components/ui/ProhibitedModal';
import { ExitModal } from '~/components/ui/ExitModal';

export default function Accounts() {
  const { dataAccount, filterInovoices } = useContext(AuthContext);

  const [isOpenProhibited, setIsOpenProhibited] = useState(false);
  const [isOpenExist, setIsOpenExist] = useState(false);

  //const [dataAccount, setDataAccount] = useState<Array<billsProps>>([]);

  async function handleDeleteTransaction(id: string) {
    await api.delete('inovoice/delete', {
      params: {
        id: id
      }
    });

    filterInovoices();
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

        <div className="w-[95%] max-w-[1120px]">
          <button
            onClick={handleOpenModalProhibited}
            className="bg-green-500 w-[200px] text-black flex justify-start items-center rounded-md
         h-[30px]  p-[10px] duration-[0.3s] hover:text-white hover:bg-green-400"
          >
            <span className="ml-2">Adicionar receita!</span>
          </button>

          <button
            onClick={handleOpenModalExit}
            className="bg-red-500 w-[200px] text-black flex justify-start items-center rounded-md
         h-[30px] p-[10px] duration-[0.3s] hover:text-white hover:bg-red-400"
          >
            <span className="ml-2">Adicionar despesa!</span>
          </button>
        </div>

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
