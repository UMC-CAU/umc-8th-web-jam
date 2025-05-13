import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import { Tag } from '../types/lp';

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null); // <input type="file">를 JS에서 직접 제어하기 위해 useRef로 참조 객체 생성

  const addTag = () => {
    if (tagInput.trim() === '') return;
    setTags([...tags, { id: Date.now(), name: tagInput.trim() }]);
    setTagInput('');
  };

  const removeTag = (targetId: number) => {
    setTags(tags.filter((tag) => tag.id !== targetId));
  };

  const handleDiskClick = () => {
    fileInputRef.current?.click(); // 숨겨진 <input>을 LP 디스크 클릭 시 자동 클릭
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url); // LP 디스크 안에서 이미지 미리보기로 사용
    setThumbnail(url); // 서버에 전송할 thumbnail URL로 설정
  };

  const createLp = useMutation({
    mutationFn: async () => {
      const body = {
        title,
        content,
        thumbnail,
        tags: tags.length > 0 ? tags.map((t) => t.name) : ['default'],
        published: true,
      };
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
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-5 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 text-center">LP 등록</h2>

        <div
          className="relative w-48 aspect-square mx-auto cursor-pointer"
          onClick={handleDiskClick}
          style={{ animation: 'rotateDisk 8s linear infinite' }}
        >
          <div
            className="w-full h-full rounded-full shadow-2xl"
            style={{
              background: `repeating-radial-gradient(circle at center, #111 0%, #111 4%, #1c1c1c 4%, #1c1c1c 8%)`,
            }}
          />
          {previewUrl && (
            <div className="absolute top-1/2 left-1/2 w-28 h-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full z-10">
              <img src={previewUrl} alt="미리보기" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="absolute top-1/2 left-1/2 w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full z-20 border border-gray-500 bg-gray-100 shadow-inner" />
        </div>

        {/* 숨겨진 파일 업로더: 사용자가 직접 클릭하지는 않지만, 디스크 클릭 시 JavaScript로 .click()을 호출해서 간접적으로 여는 방식*/}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

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

      <style>{`
        @keyframes rotateDisk {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
