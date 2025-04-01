// src/pages/movies.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import { useLocation } from 'react-router-dom'; // path 별로 가져오기 위해

export default function Movies(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 목록을 저장할 상태 변수
  const location = useLocation(); // 현재 경로 정보
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TMDB API에 axios를 이용해 GET 요청 날리는 함수
    const fetchMovies = async () => {
      try{
        // URL 경로에서 'popular', 'upcoming' 등을 추출
      const path: string = location.pathname.replace('/', ''); 

      const res = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${path}?language=en-US&page=1`, // Query Parameter: en-US, page 1으로 되어 있음
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
    } catch (err) {
      console.error('영화 정보를 성공적으로 불러오지 못했습니다. API 요청 URL을 확인해보세요.', err);
      setError('영화 정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
    }

      }
    fetchMovies(); // 조건 만족 시 실행할 코드
  }, [location.pathname]); // 경로가 바뀔 때마다 다시 실행

  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-xl text-center font-semibold">
          {error}
        </div>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // w300은 해상도
              className="rounded-xl shadow-md mx-auto group-hover:blur-sm group-hover:scale-110 transition"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition">
              <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
              <p className="text-sm line-clamp-5 px-4">{movie.overview}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
