// src/pages/movies.tsx
import { ReactElement, useState } from 'react';
import useCustomFetch from '../hooks/useCustomFetch';
import { MovieResponse } from '../types/movie';
import { useLocation, Link } from 'react-router-dom';

export default function Movies(): ReactElement {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const path = location.pathname.replace('/', '');
  const url = `https://api.themoviedb.org/3/movie/${path}?language=en-US&page=${page}`;
  const { data: response, isLoading, error } = useCustomFetch<MovieResponse>(url);

  const movies = response?.results ?? [];
  const totalPages = response?.total_pages ?? 0;
  //console.log(totalPages);
// response가 존재하면 내부의 results 또는 total_pages 값을 사용,
// 존재하지 않으면 각각 빈 배열, 0으로 기본값을 설정
// 옵셔널 체이닝과 nullish 병합 연산자(??)를 함께 사용하여 response가 아직 undefined거나 null일 수 있음'을 안전하게 처리
// 기존에는 커스텀 훅 추가하고도 아래와 같이 불필요한 useEffect를 사용했었음

/*
useEffect(() => {
    if (data) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
  }, [data]);
*/

// 하지만 커스텀 훅을 사용함으로써 카테고리 넘어갈 때 1페이지로 가지 않는 문제는 다시 해결 전으로...
// 페이지 별로 URL을 만들까? Ex) /upcoming/12
// 근데 URL을 바꿔도 useEffect 가 실행되지 useCustomFetch가 실행되는 건 아니지 않나?
// -> useCustomFetch의 구조를 변경?
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
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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