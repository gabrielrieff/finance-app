'use client';

import { ResumeFinance } from '~/components/ResumeFinance';

import { categorysProps } from '~/@types/category';
//import { resultProps } from '~/@types/result';
import { api } from '~/services/Api';
import { ListAccount } from '~/components/List';
import { useEffect, useState } from 'react';

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
    setDataAccount(inovoice.data);
  }

  useEffect(() => {
    Inovoices();
  }, []);

  return (
    <>
      <main className="flex min-w-screen flex-col items-center justify-center gap-[20px]">
        <ResumeFinance />

        <ListAccount
          Accounts={dataAccount}
          handleFinishTransaction={handleDeleteTransaction}
        />
      </main>
    </>
  );
}
