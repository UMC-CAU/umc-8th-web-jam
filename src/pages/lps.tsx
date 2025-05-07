import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import api from '../utils/api';
import { LPResponse } from '../types/lp'; 

export default function LPsPage() {
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const { data, error, isLoading } = useQuery({
    queryKey: ['lps', order],
    queryFn: async () => {
      const res = await api.get<{ data: LPResponse }>(`/v1/lps?order=${order}`);
      return res.data.data;
    },
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4 gap-2">
            <button
                onClick={() => setOrder('asc')}
                className={`px-3 py-1 text-sm rounded-md border transition
                ${order === 'asc'
                    ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                    : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'}`}
            >
                오래된순
            </button>

            <button
                onClick={() => setOrder('desc')}
                className={`px-3 py-1 text-sm rounded-md border transition
                ${order === 'desc'
                    ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                    : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'}`}
            >
                최신순
            </button>
            </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.data?.map((lp) => (
          <div
            key={lp.id}
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
        ))}
      </div>
    </div>
  );
}