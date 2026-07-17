import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import AuthLayout from './layouts/AuthLayout';
import EmployLayout from './layouts/EmployLayout';
import {
  EmployHome,
  EmployDashboard,
  EmployNotification,
  EmployTallyStock,
  EmployTallyLedger,
  EmployTallyVoucher,
  EmployTallyGodown,
  EmploySocialHome,
  EmploySocialAnalytics,
  EmploySocialUpload,
  EmploySetting,
  EmployLogin,
  NotFound,
} from './pages';
import { ProtectedRoute } from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to="/employ/home" replace /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <EmployLogin /> },
    ],
  },
  {
    path: '/employ',
    children: [
      { index: true, element: <Navigate to="/employ/home" replace /> },
      { path: 'login', element: <EmployLogin /> },
      {
        element: (
          <ProtectedRoute loginPath="/employ/login" allowedRoles={['employee']}>
            <EmployLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'home', element: <EmployHome /> },
          { path: 'dashboard', element: <EmployDashboard /> },
          { path: 'notification', element: <EmployNotification /> },
          { path: 'tally/stock', element: <EmployTallyStock /> },
          { path: 'tally/ledger', element: <EmployTallyLedger /> },
          { path: 'tally/voucher', element: <EmployTallyVoucher /> },
          { path: 'tally/godown', element: <EmployTallyGodown /> },
          { path: 'social/home', element: <EmploySocialHome /> },
          { path: 'social/analytics', element: <EmploySocialAnalytics /> },
          { path: 'social/upload', element: <EmploySocialUpload /> },
          { path: 'setting', element: <EmploySetting /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
