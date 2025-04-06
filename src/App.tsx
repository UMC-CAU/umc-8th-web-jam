import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
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
