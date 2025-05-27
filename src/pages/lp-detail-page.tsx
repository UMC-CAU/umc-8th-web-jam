// src/pages/LpDetailPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import api from '../utils/api';
import { LP } from '../types/lp';
import CommentSection from '../components/CommentSection';
import LpUpdateModal from '../components/LpUpdateModal';

export default function LpDetailPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { lpid } = useParams();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [showEditModal, setShowEditModal] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['lp', lpid],
    queryFn: async () => {
      const res = await api.get<{ data: LP }>(`/v1/lps/${lpid}`);
      return res.data.data;
    },
    enabled: !!lpid,
  });

  const deleteLp = useMutation({
    mutationFn: async () => {
      console.log(`${lpid} 삭제 호출`);
      const res = await api.delete(`/v1/lps/${lpid}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps', lpid] });
      alert('LP 삭제 완료');
      navigate('/lps');
    },
    onError: (error) => {
      console.error('LP 삭제 실패', error);
    },
  });

  const likeLP = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/v1/lps/${lpid}/likes`);
      return res.data;
    },
    // onMutate: UI를 먼 업데이트하고, 이전 상태 저장
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['lp', lpid] }); // 해당 쿼리의 fetch를 중단시킴 (중간에 불필요한 업데이트 방지)
      const previous = queryClient.getQueryData(['lp', lpid]); // 현재 캐시 상태를 백업해둠 (실패 시 롤백용)

      // 캐시를 즉시 업데이트하여 좋아요가 반영된 것처럼 UI에 표시
      // old는 현재 캐시에 들어 있는 LP 데이터 (LP 객체), React Query가 해당 쿼리 키의 현재 캐시값을 자동으로 넣어줌 (old)
      queryClient.setQueryData(['lp', lpid], (old: LP) => {
        if (!old) return old;
        return {
          ...old,
          likes: [...old.likes, { id: Date.now(), userId: 'temp', lpId: lpid }], // 일단 임시로 좋아요를 하나 만들어서 넣었다가 onSettled에서 실제와 동기화 (보여주기용)
        };
      });

      return { previous }; // 롤백용 데이터 전달, onError나 onSettled의 context로 넘어감
    },
    // 서버 요청 실패 시, 이전 상태로 롤백
    onError: (error, _, context) => {
      // mutationFn에 전달된 인자가 없어서 variables는 안 씀
      if (context?.previous) {
        // onError가 호출된 상태에서, onMutate에서 previous를 return한 경우
        queryClient.setQueryData(['lp', lpid], context.previous); // 기존 상태로 다시
      }
      console.log(error);
    },
    // 성공 여부와 무관하게 항상 서버 데이터 다시 가져옴 (동기화)
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpid] }); // 서버 데이터로 최신화
    },
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
          <button
            className="text-sm text-gray-400 hover:text-white"
            onClick={() => setShowEditModal(true)}
          >
            ✏️ 수정
          </button>
          <button
            className="text-sm text-gray-400 hover:text-red-400"
            onClick={() => deleteLp.mutate()}
          >
            🗑 삭제
          </button>
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
        <button
          className="text-lg hover:scale-120 transition-transform focus:outline-none"
          onClick={() => likeLP.mutate()}
        >
          ❤️
        </button>{' '}
        {data.likes.length}명에게 사랑받음
      </div>

      <CommentSection lpid={lpid!} order={order} setOrder={setOrder} />
      {showEditModal && <LpUpdateModal lp={data} onClose={() => setShowEditModal(false)} />}
    </div>
  );
}
