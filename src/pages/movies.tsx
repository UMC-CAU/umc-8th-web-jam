// src/pages/movies.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import { useLocation, Link } from 'react-router-dom';

export default function Movies(): ReactElement {
  const location = useLocation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // fetchMovies 함수 분리
  const fetchMovies = async (targetPage: number) => { // page를 받아서 사용
    setIsLoading(true);
    try {
      const path = location.pathname.replace('/', '');
      const res = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${path}?language=en-US&page=${targetPage}`,
        {
          headers: {
            accept: 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDVjZTMzNWJjMTVmNzczMWM2MjNkNTI1MmMyZDU0MiIsIm5iZiI6MTc0MzUwNzcyOS43MDUsInN1YiI6IjY3ZWJkMTExMzg1ZWEwMWI4OTdhYWUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDbzc39Q-TuRwGRjjAU52FBJC0AtupmBkYqfXnsN5R4',
          },
        }
      );
      setMovies(res.data.results); // 영화 정보들
      setTotalPages(res.data.total_pages); // 전체 페이지 수
      setError(null);
    } catch (err) {
      console.error('영화 정보를 불러오는 데 실패했습니다.', err);
      setError('영화 정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false); // 영화 정보 다 불러왔으면 로딩 종료
    }
  };

  // 경로가 바뀌면 페이지를 1로 리셋하고 fetch
  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [location.pathname]);

  // 페이지 버튼 눌렀을 때 fetch
  useEffect(() => {
    if (page !== 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4 my-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
        >
          ⬅︎
        </button>
        <span className="text-xl font-semibold">{page} 페이지</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
        >
          ➡︎
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-xl text-center font-semibold">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500" />
        </div>
      ) : (
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <li key={movie.id} className="relative group">
                <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-md mx-auto group-hover:blur-sm group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-blue-200 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                  <p className="text-sm line-clamp-5 px-4">{movie.overview}</p>
                </div>
                </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}