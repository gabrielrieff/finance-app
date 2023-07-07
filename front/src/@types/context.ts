export type UserProps = {
  id: string;
  name: string;
  email: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export type newInovoiceProps = {
  description: string;
  value: number;
  type: boolean;
  category_id: string;
};

//export default  newInovoiceProps, SignUpProps, SignInProps, UserProps ;
