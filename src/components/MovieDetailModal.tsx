import { ReactElement } from 'react';
import { MovieDetailResponse } from '../types/movie';

interface MovieDetailModalProps {
  movie: MovieDetailResponse;
  onClose: () => void;
}

export default function MovieDetailModal({
  movie,
  onClose,
}: MovieDetailModalProps): ReactElement {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-xl overflow-hidden relative">
        {/* 상단 배경 이미지 + 제목 */}
        <div className="relative w-full h-52 sm:h-60 md:h-72 bg-gray-300">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="Backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 hover:scale-150 duration-300 ease-in-out transition">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow ">{movie.title}</h1>
            <p className="text-sm sm:text-base md:text-lg drop-shadow">{movie.original_title}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-8 h-8 text-sm"
          >
            ✕
          </button>
        </div>

        {/* 본문 영역 */}
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          {/* 포스터 */}
          <div className="flex-shrink-0 w-full sm:w-40 hover:scale-110 transition">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded shadow-md"
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex-1 text-gray-800 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-blue-600 font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({movie.vote_count} 평가)</span>
            </div>
            <p>
              <strong>개봉일:</strong> {movie.release_date}
            </p>
            <p>
              <strong>인기도:</strong>
              <div className="w-full h-2 bg-gray-200 rounded mt-1">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{
                    width: `${Math.min(movie.popularity, 100)}%`,
                  }}
                />
              </div>
            </p>
            <p>
              <strong>장르:</strong> {movie.genres.map((g) => g.name).join(', ')}
            </p>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed whitespace-pre-line">
              {movie.overview || '줄거리 정보 없음'}
            </p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-4 p-4 border-t">
          {movie.imdb_id && (
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              IMDb에서 검색
            </a>
          )}
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}