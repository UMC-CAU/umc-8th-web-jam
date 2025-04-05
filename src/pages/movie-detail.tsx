// src/pages/movie-detail.tsx
import { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { MovieDetailResponse } from '../types/movie-detail';
import { Cast, CastResponse } from '../types/credits';
import { useParams } from 'react-router-dom';

export default function MovieDetailPage(): ReactElement | null {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const resMovie = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          },
        );
        setMovie(resMovie.data);
        const resCast = await axios.get<CastResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          },
        );
        setCast(resCast.data.cast);
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
    return <div className="text-center text-red-600 text-xl font-semibold mt-10">{error}</div>;
  }

  if (!movie) return null;

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-50 -z-10"
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

        <div className="w-full md:w-2/3 space-y-2 text-left text-lg leading-relaxed md:ml-4">
          <h2 className="text-4xl font-bold">{movie.title}</h2>
          <p>
            <strong>🗓 release date</strong> {movie.release_date}
          </p>
          <p>
            <strong>🎭 genres</strong> {movie.genres.map((g) => g.name).join(', ')}
          </p>
          <p>
            <strong>⏱️ runtime</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>🔥 popularity</strong> {movie.popularity.toLocaleString()}
          </p>
          <p>
            <strong>⭐ vote average</strong> {movie.vote_average.toFixed(1)} / 10
          </p>
          <p>
            <strong>💸 budget</strong> ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong>🏢 production company</strong>{' '}
            {movie.production_companies.map((c) => c.name).join(', ') || '정보 없음'}
          </p>
          <p>
            <strong>🌍 production country</strong>{' '}
            {movie.production_countries.map((c) => c.name).join(', ')}
          </p>

          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-8">
        {cast.map((actor) => (
          <li
            key={actor.id}
            className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 h-full"
          >
            <div className="w-full aspect-[2/3] bg-gray-200">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={actor.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-grow p-4 text-center flex flex-col justify-center min-h-[100px]">
              <h3 className="text-base font-semibold text-gray-800">{actor.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
