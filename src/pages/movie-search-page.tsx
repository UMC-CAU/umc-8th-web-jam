import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import {
  Movie,
  MovieResponse,
  MovieDetailResponse,
} from '../types/movie';
import MovieDetailModal from '../components/MovieDetailModal';

const fetchMovies = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, string, string, boolean];
}): Promise<MovieResponse> => {
  const [, query, lang, adult] = queryKey;

  const res = await axios.get<MovieResponse>('https://api.themoviedb.org/3/search/movie', {
    params: {
      query,
      page: pageParam,
      language: lang,
      include_adult: adult.toString(),
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });

  return res.data;
};

const fetchMovieDetail = async (
  movieId: number,
  lang: string
): Promise<MovieDetailResponse> => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: { language: lang },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  return res.data;
};

const MovieSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('ko-KR');
  const [includeAdult, setIncludeAdult] = useState(false);
  const [submittedQuery, setSubmittedQuery] = useState(''); 
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setSubmittedQuery(searchQuery);
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieResponse, Error>({
    queryKey: ['movies', submittedQuery, language, includeAdult],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: !!submittedQuery,
  });

  const {
    data: selectedMovieDetail,
    isLoading: detailLoading,
    isError: detailError,
  } = useQuery<MovieDetailResponse>({
    queryKey: ['movieDetail', selectedMovieId, language],
    queryFn: () => fetchMovieDetail(selectedMovieId as number, language),
    enabled: !!selectedMovieId && isModalOpen,
  });

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">

      {/* 검색 조건 입력 영역 */}
      <div className="flex flex-col gap-4 mb-6 text-black">
        <div className="flex flex-col sm:flex-row gap-4 items-center ">
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 flex-1 min-w-[200px] rounded"
          />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-2 rounded "
          >
            <option value="ko-KR">한국어</option>
            <option value="en-US">영어</option>
            <option value="ja-JP">일본어</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => setIncludeAdult(e.target.checked)}
            />
            성인 콘텐츠 표시
          </label>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-start"
        >
          🔍 검색하기
        </button>
      </div>

      {/* 검색 결과 */}
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-black">
          {data?.pages.flatMap((page) =>
            page.results.map((movie: Movie) => (
              <div
                key={movie.id}
                className="cursor-pointer p-2 rounded shadow hover:scale-105 transition"
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : '/no-image.png'
                  }
                  alt={movie.title}
                  className="w-full rounded"
                />
                <h2 className="mt-2 text-md font-semibold text-center">
                  {movie.title}
                </h2>
              </div>
            ))
          )}
        </div>
      )}

      {hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </button>
        </div>
      )}

      {/* 모달 */}
      {isModalOpen && (
        <>
          {detailError ? (
            <div className="text-red-600 text-center mt-4">
              영화 상세 정보를 불러오지 못했습니다.
            </div>
          ) : detailLoading ? (
            <div className="text-center mt-4">로딩 중...</div>
          ) : selectedMovieDetail ? (
            <MovieDetailModal
              movie={selectedMovieDetail}
              onClose={handleCloseModal}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default MovieSearchPage;