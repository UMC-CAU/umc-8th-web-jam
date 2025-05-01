import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import LogIn from './pages/log-in.tsx';
import SignUp from './pages/sign-up.tsx';
import MyPage from './pages/MyPage.tsx';
import RootLayout from './layout/root-layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
