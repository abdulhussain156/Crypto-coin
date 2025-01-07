import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// components
import LoadingScreen from '../components/LoadingScreen';
import MainLayout from 'src/layouts/main';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <CoinsList />, index: true },
        { path: '/coins/:name', element: <CoinDetails /> },
      ],
    },
  ]);
}

const CoinsList = Loadable(lazy(() => import('../pages/dashboard/CoinsList')));
const CoinDetails = Loadable(lazy(() => import('../pages/dashboard/CoinDetails')));
