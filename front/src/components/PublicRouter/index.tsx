'use cliente';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { APP_ROUTER } from '~/app/constants/app-router';
import { checkUserAuthenticated } from '~/utils/checkUserAuthenticated';

interface PrivateRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();

  const isUserAuthenticated = checkUserAuthenticated();

  useEffect(() => {
    if (isUserAuthenticated) {
      push(APP_ROUTER.privete.dashboard.name);
    }
  }, [isUserAuthenticated, push]);

  return (
    <>
      {isUserAuthenticated && null}
      {!isUserAuthenticated && children}
    </>
  );
};

export default PublicRoute;
