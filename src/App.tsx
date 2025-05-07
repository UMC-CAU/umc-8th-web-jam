import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import LogIn from './pages/log-in.tsx';
import SignUp from './pages/sign-up.tsx';
import MyPage from './pages/MyPage.tsx';
import RootLayout from './layout/root-layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import OAuthCallback from './pages/OAuthCallback.tsx';
import LPsPage from './pages/Lps.tsx';
import LpDetailPage from './pages/LpDetailPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'log-in',
        element: <LogIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'lps',
        element: <LPsPage />,
      },
      {
        path: 'lp/:lpid',
        element: (
          <ProtectedRoute>
            <LpDetailPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: 'my',
        element: (
          <ProtectedRoute>
            <MyPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: 'v1/auth/google/callback',
        element: <OAuthCallback />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
