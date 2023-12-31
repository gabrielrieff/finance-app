import { useState } from 'react';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { VscGear } from 'react-icons/vsc';
import { billsProps } from '~/@types/bills';
import { api } from '~/services/Api';
import { EditAccountModal } from '../ui/EditAccountModal';

import './style.css';

interface ListProps {
  handleFinishTransaction: (id: string) => void;
  Accounts: Array<billsProps>;
}

export function ListAccount({ handleFinishTransaction, Accounts }: ListProps) {
  const [item, setItem] = useState<billsProps>();
  const [isOpen, setIsOpen] = useState(false);

  async function editAccount(id: string) {
    const res = await api.get('Inovoice/detail', {
      params: {
        id: id
      }
    });
    setItem(res.data);
  }

  function convertDate(date: number) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }

  function handleOpenEditAccountModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <table className="w-[95%] max-w-[1120px] flex items-center justify-center flex-col mb-14">
        <thead className="w-full h-14 flex rounded-sm bg-white text-black mt-7 shadow-xl">
          <tr className="w-full flex item-center justify-around flex-row">
            <th className="w-[20%] flex justify-center items-center">Tipo</th>
            <th className="w-[20%] flex justify-center items-center">
              Categoria
            </th>
            <th className="w-[20%] flex justify-center items-center">Data</th>
            <th className="w-[20%] flex justify-center items-center">
              Descrição
            </th>
            <th className="w-[20%] flex justify-center items-center">Valor</th>
            <th className="w-[20%] flex justify-center items-center">
              <VscGear size={30} />
            </th>
          </tr>
        </thead>
        <tbody className="scroll w-full max-h-[400px] overflow-y-auto overflow-x-hidden flex flex-col text-center mt-[10px] shadow-xl">
          {Accounts.map((item) => {
            if (new Date(item.created_at).getMonth() == new Date().getMonth()) {
              return (
                <tr
                  key={item.id}
                  className="w-full h-[50px] py-4 flex items-center justify-around flex-row rounded-sm text-center bg-white hover:bg-yellow-50 mt-1 hover:scale-[1.02] duration-[0.5s]"
                >
                  <td className="w-[20%] flex justify-center items-center">
                    {item.type ? (
                      <BsArrowUpCircle
                        color="#157A0C"
                        size={32}
                        className="text-[24px]"
                      />
                    ) : (
                      <BsArrowDownCircle
                        color="#FF0000"
                        size={32}
                        className=""
                      />
                    )}
                  </td>
                  <td className="w-[20%] flex justify-center items-center">
                    {item.category.title}
                  </td>
                  <td className="w-[20%] flex justify-center items-center">
                    {convertDate(item.created_at)}
                  </td>
                  <td className="w-[20%] flex justify-center items-center">
                    {item.description}
                  </td>
                  <td className="w-[20%] flex justify-center items-center">
                    R${item.value.toFixed(2)}
                  </td>
                  <td className="flex items-center justify-center w-[20%]">
                    <TbEdit
                      className="text-[24px] hover:text-blue-500 duration-[0.3s] cursor-pointer"
                      onClick={() => {
                        editAccount(item.id);
                        handleOpenEditAccountModal();
                      }}
                    />
                    <TbTrash
                      className="text-[24px] hover:text-red-700 duration-[0.3s] cursor-pointer"
                      onClick={() => handleFinishTransaction(item.id)}
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      <EditAccountModal
        Account={item!}
        isOpen={isOpen}
        onRequestClose={handleOpenEditAccountModal}
      />
    </>
  );
}
