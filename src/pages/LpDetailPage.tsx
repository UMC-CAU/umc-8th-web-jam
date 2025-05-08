// src/pages/LpDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { LP } from '../types/lp';
import { CommentListResponse } from '../types/comment';
import SkeletonComment from '../components/SkeletonComment';

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

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useQuery({
    queryKey: ['comments', lpid],
    queryFn: async () => {
      const res = await api.get<{ data: CommentListResponse }>(
        `/v1/lps/${lpid}/comments?cursor=0&limit=10&order=desc`
      );
      return res.data.data;
    },
    enabled: !!lpid,
  });

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
        <div
          className="w-full h-full rounded-full shadow-2xl relative"
          style={{
            background: `repeating-radial-gradient(circle at center, #111 0%, #111 4%, #1c1c1c 4%, #1c1c1c 8%)`,
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full z-10">
          <img src={data.thumbnail} alt={data.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border border-black bg-[#2C3E50] shadow-inner" />
      </div>

      <style>{`
        @keyframes rotateDisk {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

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

      <div className="text-center text-sm text-gray-300 mb-8">
        <button className="text-lg hover:scale-120 transition-transform focus:outline-none">
          ❤️
        </button>{' '}
        {data.likes.length}명에게 사랑받음
      </div>

      <section className="bg-[#1F2A36] p-4 rounded-lg">
  <h2 className="text-lg font-semibold mb-3">댓글</h2>

  {commentError ? (
    <p className="text-red-500">댓글 로딩 실패</p>
  ) : commentLoading ? (
    <ul className="space-y-4 text-left">
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i}>
          <SkeletonComment />
        </li>
      ))}
    </ul>
  ) : commentData?.data.length === 0 ? (
    <p className="text-gray-400">아직 댓글이 없습니다.</p>
  ) : (
    <ul className="space-y-4 text-left">
      {commentData?.data.map((comment) => (
        <li key={comment.id} className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white">
            {comment.author.name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{comment.author.name}</p>
            <p className="text-sm text-gray-300">{comment.content}</p>
          </div>
        </li>
      ))}
    </ul>
  )}
</section>
    </div>
  );
}
