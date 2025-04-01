import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import Movies from './pages/movies.tsx';
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
        path: 'movies',
        element: <Movies />, // 인기 영화 목록
      },
      {
        path: 'movies/:movieId',
        // element: <MovieDetail/>  // 상세 영화 정보
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
