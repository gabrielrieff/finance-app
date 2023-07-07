import { parseCookies } from 'nookies';

export const checkUserAuthenticated = () => {
  let bool = false;
  const cookies = parseCookies();
  const token = cookies['@nextauth.token'];

  if (token === undefined) {
    bool = false;
    return bool;
  } else {
    bool = true;
    return bool;
  }
};
