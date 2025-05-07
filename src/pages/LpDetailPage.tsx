// src/pages/LpDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { LP } from '../types/lp';

export default function LpDetailPage() {
  const { lpid } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: async () => {
      const res = await api.get<{ data: LP }>(`/v1/lps/${lpid}`);
      return res.data.data;
    },
    enabled: !!lpid,
  });

  console.log('LPid:', lpid);
  if (isLoading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">에러 발생</div>;
  if (!data) return <div className="p-6">데이터 없음</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <div className="flex justify-between items-center mb-2 text-sm text-gray-300">
        <div>
          {data.author?.name} · {new Date(data.createdAt).toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-gray-400 hover:text-white">✏️ 수정</button>
          <button className="text-sm text-gray-400 hover:text-red-400">🗑 삭제</button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">{data.title}</h1>

      <div
        className="relative w-full max-w-xs aspect-square mx-auto mb-6"
        style={{
          animation: 'rotateDisk 10s linear infinite',
        }}
      >
        {/* LP 판 (입체감 + 동심원 질감) */}
        <div
          className="w-full h-full rounded-full shadow-2xl relative"
          style={{
            background: `
        repeating-radial-gradient(circle at center, 
          #111 0%, 
          #111 4%, 
          #1c1c1c 4%, 
          #1c1c1c 8%
        )`,
          }}
        ></div>

        {/* 중앙 이미지 (조금 더 큼) */}
        <div className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full  z-10">
          <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
        </div>

        {/* 중앙 구멍 */}
        <div className="absolute top-1/2 left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border border-black bg-[#2C3E50] shadow-inner" />
      </div>

      <style>
        {`
    @keyframes rotateDisk {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
      </style>

      <p className="text-white leading-relaxed mb-6 whitespace-pre-line text-center">
        {data.content}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {data.tags.map((tag) => (
          <span
            key={tag.id}
            className="text-xs bg-[#FFF8DC] text-[#5B3A00] border border-[#FDE7A3] px-2 py-1 rounded"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="text-center text-sm text-gray-300">
        <button className="text-lg hover:scale-120 transition-transform focus:outline-none">
          ❤️
        </button>{' '}
        {data.likes.length}명에게 사랑받음
      </div>
    </div>
  );
}
