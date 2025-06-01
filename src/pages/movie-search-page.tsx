import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useMemo, useCallback } from 'react';
import { MovieResponse, MovieDetailResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
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

const fetchMovieDetail = async (movieId: number, lang: string): Promise<MovieDetailResponse> => {
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

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    MovieResponse,
    Error
  >({
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


  // useCallback()으로 불필요한 함수 객체 재생성을 방지하여 MovieCard의 리렌더링을 최소화
  const handleMovieClick = useCallback((movieId: number) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  }, []);

  // useMemo()로 data가 변경되지 않는 한, 기존 배열 결과를 재사용하여 불필요한 계산과 렌더링 방지
  const movieList = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? [];
  }, [data]);

  return (
    
    <div className="p-4 sm:p-6 md:p-8">
      {/* 검색 조건 입력 영역 */}
      <div className="flex flex-col gap-4 mb-6 text-black">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
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
            className="border p-2 rounded"
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
        <div className="text-center text-lg text-gray-600 mt-10">영화 정보를 불러오는 중...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg mt-10">
          영화 데이터를 불러오지 못했습니다. 다시 시도해주세요.
        </div>
      ) :  (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-black">
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
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
            <MovieDetailModal movie={selectedMovieDetail} onClose={() => setIsModalOpen(false)} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default MovieSearchPage;
