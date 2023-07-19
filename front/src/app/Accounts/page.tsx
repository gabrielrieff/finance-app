'use client';

import { AuthContext } from '~/context/auth/AuthContext';
import { api } from '~/services/Api';
import { useContext, useState } from 'react';

import { ResumeFinance } from '~/components/ResumeFinance';
import { ListAccount } from '~/components/List';
import { ExitModal } from '~/components/ui/ExitModal';

export default function Accounts() {
  const { dataAccount, filterInovoices } = useContext(AuthContext);
  const [isOpenExist, setIsOpenExist] = useState(false);

  async function handleDeleteTransaction(id: string) {
    await api.delete('inovoice/delete', {
      params: {
        id: id
      }
    });

    filterInovoices();
  }

  function handleOpenModalExit() {
    setIsOpenExist(!isOpenExist);
  }
  return (
    <>
      <div
        id="__next"
        className="flex min-w-screen flex-col items-center justify-center gap-[20px]"
      >
        <ResumeFinance />

        <ListAccount
          Accounts={dataAccount}
          handleFinishTransaction={handleDeleteTransaction}
        />

        <ExitModal isOpen={isOpenExist} onRequestClose={handleOpenModalExit} />
      </div>
    </>
  );
}
