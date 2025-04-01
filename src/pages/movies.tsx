// src/pages/movies.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';

export default function Movies(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 목록을 저장할 상태 변수

  useEffect(() => {
    // TMDB API에 axios를 이용해 GET 요청 날리는 함수
    const fetchMovies = async () => {
      const res = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', // Query Parameter: en-US, page 1으로 되어 있음
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
    };

    fetchMovies(); // 조건 만족 시 실행할 코드
  }, []); // 처음 마운트 시 1회만 실행됨

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">🎬 인기 영화 목록 🍿</h1>
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <li key={movie.id} className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} // w300은 해상도
              className="rounded-xl shadow-md mx-auto group-hover:blur-sm hover:scale-150 transition"
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
