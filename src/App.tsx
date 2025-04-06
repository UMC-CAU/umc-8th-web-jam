import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import LogIn from './pages/log-in.tsx';
import RootLayout from './layout/root-layout.tsx';

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
      /*
      {
        path: 'movies/:movieId',
        element: <MovieLayout />,
        children: [
          {
            index: true,
            element: <MovieDetail />,
          },
        ],
      },*/
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
