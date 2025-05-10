import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { LPResponse } from '../types/lp';
import SkeletonCard from '../components/SkeletonCard';

const fetchLps = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, string]; // ['lps', order]
}): Promise<LPResponse> => {
  const [, order] = queryKey;
  const res = await api.get(`/v1/lps?order=${order}&cursor=${pageParam}`);

  return res.data.data;
};

export default function LPsPage() {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<LPResponse, Error>({
      queryKey: ['lps', order], // order는 useState 등으로 정의
      queryFn: fetchLps,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    });

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error) return <p>에러 발생</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={() => setOrder('asc')}
          className={`px-3 py-1 text-sm rounded-md border transition
            ${
              order === 'asc'
                ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'
            }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder('desc')}
          className={`px-3 py-1 text-sm rounded-md border transition
            ${
              order === 'desc'
                ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'
            }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading
          ? Array.from({ length: 15 }).map((_, idx) => <SkeletonCard key={`init-${idx}`} />)
          : data?.pages.flatMap((page) =>
              page.data.map((lp) => (
                <div
                  key={lp.id}
                  onClick={() => navigate(`/lp/${lp.id}`)}
                  className="relative group overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={lp.thumbnail}
                    alt={lp.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 text-white flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center px-2">
                      <h2 className="text-sm font-semibold text-center">{lp.title}</h2>
                    </div>
                    <div className="flex justify-between items-center text-xs px-3 py-2">
                      <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
                      <span>♥︎ {lp.likes.length}</span>
                    </div>
                  </div>
                </div>
              )),
            )}

        {/* 다음 페이지 로딩 중 Skeleton UI */}
        {isFetchingNextPage &&
          Array.from({ length: 10 }).map((_, idx) => <SkeletonCard key={`more-${idx}`} />)}
      </div>

      {error && <p className="text-red-500 mt-4">에러 발생</p>}

      {/* 관찰자용 div */}
      <div ref={observerRef} style={{ height: 20 }} />
    </div>
  );
}
