import SuspenseWrapper from '@components/suspense-wrapper';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/home';

// Admin Module
const LazyAdmin = lazy(() => import('../pages/admin'));
const LazyUsers = lazy(() => import('../pages/admin/users'));
const LazyBranches = lazy(() => import('../pages/admin/branches'));
const LazyDashboard = lazy(() => import('../pages/admin/dashboard'));
const LazyAreas = lazy(() => import('../pages/admin/areas'));
// House For Sales
const LazyHouseForSales = lazy(() => import('../pages/house-for-sales'));
// House For Rent
const LazyHouseForRent = lazy(() => import('../pages/house-for-rent'));
// Login or Register
const LazyLoginOrRegister = lazy(() => import('../pages/login-or-register'));

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/login-or-register',
      element: <SuspenseWrapper element={<LazyLoginOrRegister />} />,
    },
    {
      path: '/for-sales',
      element: <SuspenseWrapper element={<LazyHouseForSales />} />,
    },
    {
      path: '/for-rent',
      element: <SuspenseWrapper element={<LazyHouseForRent />} />,
    },
    {
      path: '/admin',
      element: <SuspenseWrapper element={<LazyAdmin />} />,
      children: [
        {
          path: 'areas',
          element: <SuspenseWrapper element={<LazyAreas />} />,
        },
        {
          path: 'users',
          element: <SuspenseWrapper element={<LazyUsers />} />,
        },
        {
          path: 'branches',
          element: <SuspenseWrapper element={<LazyBranches />} />,
        },
        {
          index: true,
          element: <SuspenseWrapper element={<LazyDashboard />} />,
        },
      ],
    },
    {
      path: '/',
      element: <Home />,
    },
  ]);
  return <>{routes}</>;
};

export default AppRoutes;
