import SuspenseWrapper from '@components/suspense-wrapper';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '../pages/home';

// Admin Module
const LazyAdmin = lazy(() => import('../pages/admin'));
const LazyUsers = lazy(() => import('../pages/admin/users'));
const LazyBranches = lazy(() => import('../pages/admin/branches'));
const LazyDashboard = lazy(() => import('../pages/admin/dashboard'));
// House For Sales
const LazyHouseForSales = lazy(() => import('../pages/house-for-sales'));
// House For Rent
const LazyHouseForRent = lazy(() => import('../pages/house-for-rent'));
// Auth
const LazyLogin = lazy(() => import('../pages/login'));
const LazyRegister = lazy(() => import('../pages/register'));
const LazyForgotPassword = lazy(() => import('../pages/forgot-password'));
// Profile
const LazyProfile = lazy(() => import('../pages/profile'));

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/profile',
      element: <SuspenseWrapper element={<LazyProfile />} />,
    },
    {
      path: '/login',
      element: <SuspenseWrapper element={<LazyLogin />} />,
    },
    {
      path: '/register',
      element: <SuspenseWrapper element={<LazyRegister />} />,
    },
    {
      path: '/forgot-password',
      element: <SuspenseWrapper element={<LazyForgotPassword />} />,
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
