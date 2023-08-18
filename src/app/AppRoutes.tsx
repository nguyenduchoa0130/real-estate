import SuspenseWrapper from '@components/suspense-wrapper';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import HomePage from '../pages/home';

// Admin Module
const LazyAdminPage = lazy(() => import('../pages/admin'));
const LazyUsers = lazy(() => import('../pages/admin/users'));
const LazyBranches = lazy(() => import('../pages/admin/branches'));
const LazyDashboard = lazy(() => import('../pages/admin/dashboard'));


const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/admin',
      element: <SuspenseWrapper element={<LazyAdminPage />} />,
      children: [
        {
          path: 'users',
          element: <SuspenseWrapper element={<LazyUsers />} />
        },
        {
          path: 'branches',
          element: <SuspenseWrapper element={<LazyBranches />} />
        },
        {
          index: true,
          element: <SuspenseWrapper element={<LazyDashboard />} />
        },
      ]
    },
    {
      path: '/',
      element: <HomePage />
    }
  ]);
  return (
    <>{routes}</>
  );
};

export default AppRoutes;