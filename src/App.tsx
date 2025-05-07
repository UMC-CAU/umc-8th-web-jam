import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import LogIn from './pages/log-in.tsx';
import SignUp from './pages/sign-up.tsx';
import MyPage from './pages/MyPage.tsx';
import RootLayout from './layout/root-layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import OAuthCallback from './pages/OAuthCallback.tsx'; 

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
        element: <LogIn />, // 인기 영화 목록
      },
      {
        path: 'sign-up',
        element: <SignUp />, // 인기 영화 목록
      },
      {
        path: "my",
        element: (
          <ProtectedRoute>
            <MyPage/>,
          </ProtectedRoute>
        )
      },
      {
        path: 'v1/auth/google/callback',  // ✅ 이 경로 반드시 등록
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
  ) 
}

export default App;
