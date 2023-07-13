import { categorysProps } from '~/@types/category';

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
