// src/pages/movie-detail.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { MovieDetail } from '../types/movie-detail';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage(): ReactElement | null {  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDVjZTMzNWJjMTVmNzczMWM2MjNkNTI1MmMyZDU0MiIsIm5iZiI6MTc0MzUwNzcyOS43MDUsInN1YiI6IjY3ZWJkMTExMzg1ZWEwMWI4OTdhYWUzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KDbzc39Q-TuRwGRjjAU52FBJC0AtupmBkYqfXnsN5R4',
            },
          }
        );
        setMovie(res.data);
        setError(null);
      } catch (err) {
        console.error('영화 정보를 불러오는 데 실패했습니다.', err);
        setError('영화 정보를 불러오는 데 실패했어요. 다시 시도해 주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl font-semibold mt-10">
        {error}
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-40 -z-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      />
  
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 text-black z-10">
        <div className="w-full md:w-1/3 hover:scale-110 transition duration-500">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg mx-auto"
          />
        </div>
  
        <div className="w-full md:w-2/3 space-y-2 text-left">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <p><strong>개봉일:</strong> {movie.release_date}</p>
          <p>
            <strong>장르:</strong>{' '}
            {movie.genres.map((g) => g.name).join(', ')}
          </p>
          <p><strong>상영시간:</strong> {movie.runtime}분</p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}