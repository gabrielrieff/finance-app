'use client';

import Modal from 'react-modal';
import { Input } from './Input';
import { useState, useContext, FormEvent, useEffect } from 'react';
import { Button } from './Button';
import { AuthContext } from '~/context/auth/AuthContext';
import { api } from '~/services/Api';
import { categorysProps } from '~/@types/category';

interface modalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ExitModal({ isOpen, onRequestClose }: modalOrderProps) {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState('');
  const [category_id, setCategory_id] = useState('');
  const [arrayCategoris, setArrayCategoris] = useState<Array<categorysProps>>(
    []
  );

  const { addAccount } = useContext(AuthContext);

  async function salveInvoice(event: FormEvent) {
    event.preventDefault();

    const type = false;

    const data = { description, value, type, category_id };

    addAccount(data);

    setValue(0);
    setCategory_id('');
    setDescription('');
  }

  async function fetchCategoris() {
    const responseCategoris = await api.get('/category');
    const categoris = await responseCategoris.data;
    return setArrayCategoris(categoris);
  }

  useEffect(() => {
    fetchCategoris();
  }, [isOpen]);

  return (
    <Modal style={customStyle} isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="flex justify-center items-center flex-col h-full">
        <h1 className="font-bold text-[25px]">Adicionar despesa</h1>
        <form
          onSubmit={salveInvoice}
          className="w-[80%] h-[90%] flex justify-evenly flex-col"
        >
          <div className="flex flex-col justify-center">
            <label>Valor</label>
            <Input
              onChange={(e) => setValue(e.target.valueAsNumber)}
              type="number"
              value={value}
              placeholder="100.99"
            />
          </div>

          <div className="flex flex-col justify-center">
            <label>Categoria</label>
            <select
              className="p-3 rounded-lg"
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option label="Categorias"></option>
              {arrayCategoris.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <label>Descrição</label>
            <Input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Salario recebido do projeto XYZ"
            />
          </div>

          <div className="flex justify-around">
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500 focus:bg-green-500 duration-[0.3s] px-[50px] py-[5px] rounded-[5px]"
            >
              Salvar
            </Button>
            <Button
              className="bg-red-400 hover:bg-red-500 focus:bg-red-500 duration-[0.3s] px-[50px] py-[5px] rounded-[5px]"
              onClick={onRequestClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const customStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.80)'
  },
  content: {
    top: '50%',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    padding: '30px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F0F2F5',
    width: '50%',
    height: '50%'
  }
};
