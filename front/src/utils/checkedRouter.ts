/**
 * @parms asPath
 *@returns
 */

import { APP_ROUTER } from '~/app/constants/app-router';

export const checkedRouter = (asPath: string) => {
  const appPublicRoutes = Object.values(APP_ROUTER.public);

  return appPublicRoutes.includes(asPath);
};
