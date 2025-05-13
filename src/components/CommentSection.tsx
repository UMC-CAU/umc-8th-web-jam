import { useInfiniteQuery, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { CommentListResponse } from '../types/comment';
import SkeletonComment from './SkeletonComment';
import api from '../utils/api';

interface CommentSectionProps {
  lpid: string;
  order: 'asc' | 'desc';
  setOrder: (order: 'asc' | 'desc') => void;
}

const fetchComments = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, string, string];
}): Promise<CommentListResponse> => {
  const [, lpid, order] = queryKey;
  const res = await api.get(`/v1/lps/${lpid}/comments?cursor=${pageParam}&limit=10&order=${order}`);
  return res.data.data;
};

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/v1/users/me');
      return res.data.data;
    },
  });
};

export default function CommentSection({ lpid, order, setOrder }: CommentSectionProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();
  const [content, setContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // 수정 중인 댓글 Id
  const [editingContent, setEditingContent] = useState(''); // 수정 중인 내용

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<CommentListResponse, Error>({
    queryKey: ['comments', lpid, order],
    queryFn: fetchComments,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled: !!lpid,
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

  const createComment = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/v1/lps/${lpid}/comments`, { content });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpid] });
      setContent('');
    },
    onError: (error) => {
      console.error('댓글 추가 실패', error);
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      console.log(`${commentId} 삭제 호출`);
      const res = await api.delete(`/v1/lps/${lpid}/comments/${commentId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpid] }); //???
    },
    onError: (error) => {
      console.error('댓글 삭제 실패', error);
    },
  });

  const updateComment = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      const res = await api.patch(`/v1/lps/${lpid}/comments/${commentId}`, { content });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', lpid] });
      setEditingCommentId(null);
      setEditingContent('');
    },
    onError: (error) => {
      console.error('댓글 수정 실패', error);
    },
  });

  return (
    <section className="bg-[#1F2A36] p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">💬 댓글</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder('asc')}
            className={`px-2 py-1 text-xs rounded border transition ${
              order === 'asc'
                ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder('desc')}
            className={`px-2 py-1 text-xs rounded border transition ${
              order === 'desc'
                ? 'bg-[#FFF8DC] text-[#5B3A00] border-[#FDE7A3]'
                : 'bg-white text-[#5B3A00] border-[#FDE7A3] hover:bg-[#FFF8DC]'
            }`}
          >
            최신순
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white">
            {currentUser?.name?.[0] ?? '나'}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <textarea
              className="flex-1 bg-[#2b3a4c] rounded px-3 py-2 text-sm text-white resize-none h-10"
              placeholder="댓글을 입력해주세요"
              rows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              className="h-10 px-4 text-sm bg-[#FFF8DC] text-[#5B3A00] rounded hover:brightness-90 disabled:opacity-50"
              disabled={!content.trim() || createComment.isPending}
              onClick={() => {
                createComment.mutate();
              }}
            >
              작성
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <p className="text-red-500">댓글 로딩 실패</p>
      ) : isLoading ? (
        <ul className="space-y-4 text-left">
          {Array.from({ length: 8 }).map((_, i) => (
            <li key={i}>
              <SkeletonComment />
            </li>
          ))}
        </ul>
      ) : commentPages?.pages.flatMap((page) => page.data).length === 0 ? (
        <p className="text-gray-400">아직 댓글이 없습니다.</p>
      ) : (
        <ul className="space-y-4 text-left">
          {commentPages?.pages.flatMap((page) =>
            page.data.map((comment) => (
              <li key={comment.id} className="relative flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white">
                  {comment.author.name[0]}
                </div>

                <div className="flex-1">
                  {editingCommentId === comment.id ? (
                    <div>
                      <textarea
                        className="w-full text-sm p-2 rounded bg-[#2b3a4c] text-white"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <div className="mt-1 flex gap-2">
                        <button
                          className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-green-300"
                          onClick={() =>
                            updateComment.mutate({
                              commentId: comment.id,
                              content: editingContent,
                            })
                          }
                        >
                          저장
                        </button>
                        <button
                          className="text-xs px-2 py-1 bg-gray-500 text-white rounded hover:bg-red-300"
                          onClick={() => setEditingCommentId(null)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-semibold text-white">{comment.author.name}</p>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                    </>
                  )}
                </div>

                {comment.author.id === currentUser?.id && editingCommentId !== comment.id && (
                  <div className="absolute top-1 right-0 hidden group-hover:flex gap-1">
                    <button
                      className="text-white text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-500"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditingContent(comment.content);
                      }}
                    >
                      ✏️ 수정
                    </button>
                    <button
                      className="text-red-400 text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-500"
                      onClick={() => {
                        deleteComment.mutate(comment.id);
                      }}
                    >
                      🗑 삭제
                    </button>
                  </div>
                )}
              </li>
            )),
          )}
          {isFetchingNextPage &&
            Array.from({ length: 5 }).map((_, i) => (
              <li key={`loading-${i}`}>
                <SkeletonComment />
              </li>
            ))}
          <div ref={observerRef} />
        </ul>
      )}
    </section>
  );
}
