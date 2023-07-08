import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { VscGear } from 'react-icons/vsc';
import { billsProps } from '~/@types/bills';

interface ListProps {
  handleFinishTransaction: (id: string) => void;
  Accounts: Array<billsProps>;
}

export function ListAccount({ handleFinishTransaction, Accounts }: ListProps) {
  function convertDate(date: number) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }

  return (
    <>
      <table className="w-[95%] max-w-[1120px] flex items-center justify-center flex-col">
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
        <tbody className="w-full flex flex-col text-center mt-[10px] shadow-xl">
          {Accounts.map(
            (item) => (
              <tr
                key={item.id}
                className="w-full h-[50px] flex items-center justify-around flex-row rounded-sm text-center bg-white hover:bg-yellow-50 mt-1 hover:scale-[1.02] duration-[0.5s]"
              >
                <td>
                  {item.type ? (
                    <BsArrowUpCircle
                      color="#157A0C"
                      size={32}
                      className="text-[24px]"
                    />
                  ) : (
                    <BsArrowDownCircle color="#FF0000" size={32} className="" />
                  )}
                </td>
                <td> {item.category.title}</td>
                <td>{convertDate(item.created_at)}</td>
                <td>{item.description}</td>
                <td>R${item.value.toFixed(2)}</td>
                <td className="flex items-center justify-center">
                  <TbEdit
                    className="text-[24px] hover:text-blue-500 duration-[0.3s] cursor-pointer"
                    onClick={() => {
                      console.log('');
                    }}
                  />
                  <TbTrash
                    className="text-[24px] hover:text-red-700 duration-[0.3s] cursor-pointer"
                    onClick={() => handleFinishTransaction(item.id)}
                  />
                </td>
              </tr>
            )
            // if (new Date(item.created_at).getMonth() == new Date().getMonth()) {
            //   return
            // }
          )}
        </tbody>
      </table>
    </>
  );
}
