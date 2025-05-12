import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import { Tag } from '../types/lp';

//
interface LPAddModalProps {
  onClose: () => void;
}

export default function LpAddModal({ onClose }: LPAddModalProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const addTag = () => {
    if (tagInput.trim() === '') return;
    setTags([...tags, { id: Date.now(), name: tagInput.trim() }]);
    setTagInput('');
  };

  const removeTag = (targetId: number) => {
    setTags(tags.filter((tag) => tag.id !== targetId));
  };

  const createLp = useMutation({
    mutationFn: async () => {
      const body = {
        title,
        content,
        thumbnail,
        tags: tags.length > 0 ? tags.map(t => t.name) : ['default'],
        published: true,
      };

      console.log('🔥 보내는 데이터:', body); // 👈 이거 추가
      const res = await api.post(`/v1/lps`, body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      onClose();
    },
    onError: (error) => {
      console.error('LP 추가 실패', error);
    },
    // onSettled는 따로 필요 없을 듯
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-5 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">LP 등록</h2>

        <input
          className="w-full border border-gray-300 p-2 rounded text-black"
          placeholder="LP 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border border-gray-300 p-2 rounded text-black min-h-[100px]"
          placeholder="LP 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-2 rounded text-black"
          placeholder="썸네일 URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        {/* 태그 입력 */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 px-2 py-1 rounded text-black"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
            <button
              onClick={addTag}
              className="px-3 py-1 bg-[#5B3A00] text-white rounded hover:text-black transition text-sm"
            >
              추가
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag.name}
                <button onClick={() => removeTag(tag.id)} className="text-xs hover:text-red-500">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="bg-[#A47148] text-sm px-4 py-1.5 rounded text-white hover:text-black transition"
          >
            닫기
          </button>
          <button
            onClick={() => createLp.mutate()}
            className="bg-[#2C3E50] text-white px-4 py-1.5 rounded text-sm hover:text-black transition"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
