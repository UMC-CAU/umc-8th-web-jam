import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import { LP } from '../types/lp';

interface LpUpdateModalProps {
  lp: LP;
  onClose: () => void;
}

export default function LpUpdateModal({ lp, onClose }: LpUpdateModalProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(lp.title);
  const [content, setContent] = useState(lp.content);
  const [thumbnail, setThumbnail] = useState(lp.thumbnail);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(lp.tags);
  const [previewUrl, setPreviewUrl] = useState<string | null>(lp.thumbnail);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateLp = useMutation({
    mutationFn: async () => {
      const res = await api.patch(`/v1/lps/${lp.id}`, {
        title,
        content,
        thumbnail,
        tags: tags.map((t) => t.name),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', String(lp.id)] });
      onClose();
    },
    onError: (error) => {
      console.error('LP 수정 실패', error);
    },
  });

  const handleDiskClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/v1/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res.data.data.imageUrl;
      setThumbnail(url);
      setPreviewUrl(url);
    } catch (error) {
      console.log('LP 이미지 업로드 실패', error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() === '') return;
    setTags([...tags, { id: Date.now(), name: tagInput.trim() }]);
    setTagInput('');
  };

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-5 shadow-lg text-black">
        <h2 className="text-xl font-bold text-center">LP 수정</h2>

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

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <input
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="LP 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
          placeholder="LP 내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 px-2 py-1 rounded"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTag()}
            />
            <button
              onClick={addTag}
              className="px-3 py-1 bg-[#5B3A00] text-white rounded hover:text-black text-sm"
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
            className="bg-gray-300 px-4 py-1.5 rounded text-sm hover:text-black"
          >
            닫기
          </button>
          <button
            onClick={() => updateLp.mutate()}
            className="bg-[#2C3E50] text-white px-4 py-1.5 rounded text-sm hover:text-black"
          >
            수정 완료
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
