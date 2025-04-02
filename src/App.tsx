import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home.tsx';
import NotFound from './pages/not-found.tsx';
import Movies from './pages/movies.tsx';
import MovieDetail from './pages/movie-detail.tsx';
import RootLayout from './layout/root-layout.tsx';
import MovieLayout from './layout/movie-layout.tsx';

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
        path: 'popular',
        element: <Movies />, // 인기 영화 목록
      },
      {
        path: 'upcoming',
        element: <Movies />, // 인기 영화 목록
      },
      {
        path: 'top_rated',
        element: <Movies />, // 인기 영화 목록
      },
      {
        path: 'now_playing',
        element: <Movies />, // 인기 영화 목록
      },
      {
        path: 'movies/:movieId',
        element: <MovieLayout />,
        children: [
          {
            index: true,
            element: <MovieDetail />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
