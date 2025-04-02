// src/pages/movies.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import { useLocation } from 'react-router-dom'; // path 별로 가져오기 위해

export default function Movies(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 목록을 저장할 상태 변수
  const location = useLocation(); // 현재 경로 정보
  const [error, setError] = useState<string | null>(null); // 에러를 나타내는 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1); // 초기 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수

  useEffect(() => {
    setPage(1); // 무조건 첫 페이지로 초기화
  }, [location.pathname]); // 아래 useEffect에 이 내용을 추가하면 page가 바뀔 때마다 setPage(1)이 실행되어 영원히 1페이지에 갇히게 된다.
  useEffect(() => {
    // TMDB API에 axios를 이용해 GET 요청 날리는 함수
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        // URL 경로에서 'popular', 'upcoming' 등을 추출
        const path: string = location.pathname.replace('/', '');

        const res = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${path}?language=en-US&page=${page}`, // Query Parameter: en-US, page 1으로 되어 있음
          {
            headers: {
              accept: 'application/json', // 데이터 형식
              Authorization:
                // API 읽기 토큰 값
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDVjZTMzNWJjMTVmNzczMWM2MjNkNTI1MmMyZDU0MiIsIm5iZiI6MTc0MzUwNzcyOS43MDUsInN1YiI6IjY3ZWJkMTExMzg1ZWEwMWI4OTdhYWUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDbzc39Q-TuRwGRjjAU52FBJC0AtupmBkYqfXnsN5R4',
            },
          },
        );
        setMovies(res.data.results); // 받아온 데이터 중 results(영화 배열)를 상태에 저장
        setTotalPages(res.data.total_pages); // 전체 페이지 수 저장
      } catch (err) {
        console.error(
          '영화 정보를 성공적으로 불러오지 못했습니다. API 요청 URL을 확인해보세요.',
          err,
        );
        setError('영화 정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false); // fetch 끝나면 isLoading false로. 얘 없으면 무한 스핀
      }
    };
    fetchMovies(); // 조건 만족 시 실행할 코드
  }, [location.pathname, page]); // 경로가 바뀔 때마다 다시 실행

  return (
    <div className="p-4">
      <div className="flex justify-center items-center space-x-4 my-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500 text-white'
          }`}
        >
          ⬅︎
        </button>

        <span className="text-xl font-semibold">{page} 페이지</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500 text-white'
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
        // 로딩 완료 후 영화 목록 렌더링
        <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <li key={movie.id} className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="rounded-xl shadow-md mx-auto group-hover:blur-sm group-hover:scale-110 transition duration-300"
                alt={movie.title}
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-blue-200 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <p className="text-sm line-clamp-5 px-4">{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
