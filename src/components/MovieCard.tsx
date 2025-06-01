import React from 'react';
import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onClick: (id: number) => void;
}

const MovieCard = ({ movie, onClick }: Props) => {
  return (
    <div
      className="cursor-pointer p-2 rounded shadow hover:scale-105 transition"
      onClick={() => onClick(movie.id)}
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : '/no-image.png'
        }
        alt={movie.title}
        className="w-full"
      />
      <h2 className="mt-2 text-sm font-semibold text-center">{movie.title}</h2>
    </div>
  );
};

 // React.memo()로 동일한 props(movie, onClick)일 경우 리렌더링을 방지하여 렌더 성능 최적화
export default React.memo(MovieCard);