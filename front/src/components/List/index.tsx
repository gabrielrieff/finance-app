import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { VscGear } from 'react-icons/vsc';

import { billsProps } from '~/@types/bills';
import styled from './styled.module.scss';

interface ListProps {
  bills: Array<billsProps>;
  handleFinishTransaction: (id: string) => void;
  handleEdit: (id: string) => void;
}

export function ListAccount({
  bills,
  handleFinishTransaction,
  handleEdit
}: ListProps) {
  function convertDate(date) {
    const data = new Date(date);
    const newDate = data.toLocaleDateString();
    return newDate;
  }

  return (
    <>
      <table className={styled.Content}>
        <thead className={styled.THead}>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>
              <VscGear size={30} />
            </th>
          </tr>
        </thead>
        <tbody className={styled.TBody}>
          {bills.map((item) => {
            if (new Date(item.created_at).getMonth() == new Date().getMonth()) {
              return (
                <tr key={item.id}>
                  <td>
                    {item.type ? (
                      <BsArrowUpCircle
                        color="#157A0C"
                        className={styled.iconType}
                      />
                    ) : (
                      <BsArrowDownCircle
                        color="#FF0000"
                        className={styled.iconType}
                      />
                    )}
                  </td>
                  <td> {item.category.title}</td>
                  <td>{convertDate(item.created_at)}</td>
                  <td>{item.description}</td>
                  <td>R${item.value.toFixed(2)}</td>
                  <td>
                    {/* <TbEdit
                    className={styled.iconEdit}
                    onClick={() => handleEdit(item.id)}
                  /> */}
                    <TbTrash
                      className={styled.iconDelet}
                      onClick={() => handleFinishTransaction(item.id)}
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
