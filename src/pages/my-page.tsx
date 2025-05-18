import { useEffect, useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<null | {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  }>(null);

  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { currentUser, updateNickname } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/v1/users/me');
        setUserInfo(res.data.data);
      } catch (err) {
        console.error(err);
        setError('유저 정보를 불러오지 못했습니다.');
      }
    };
    fetchUser();
  }, []);

  // 숨겨진 <input type="file"> 요소를 클릭시켜 파일 탐색기를 연다. LpAddModal.tsx 참고.
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // 사용자가 아바타로 쓸 이미지를 선택하면, FormData로 서버(/v1/uploads)에 업로드하고, 받은 이미지 URL을 editAvatar에 저장합니다.
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/v1/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = res.data.data.imageUrl;
      setEditAvatar(imageUrl);
    } catch (err) {
      console.log('프로필 이미지 업로드에 실패했습니다.', err);
    }
  };

  const updateProfile = useMutation({
    mutationFn: async ({ name, bio, avatar }: { name: string; bio: string; avatar: string }) => {
      const res = await api.patch(`/v1/users`, { name, bio, avatar });
      return res.data;
    },

    onMutate: async (updatedData) => {
      const previousName = currentUser?.nickname;
      updateNickname(updatedData.name); // 마이페이지/네비바에 바로 반영
      return { previousName };
    },

    // 실패 시 롤백
    onError: (error, _, context) => {
      if (context?.previousName) {
        updateNickname(context.previousName);
      }
      console.error('프로필 수정 실패', error);
    },

    // 성공/실패 관계없이 실행: invalidate + UI 상태 정리
    onSettled: (data, error) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      if (!error && data) {
        setUserInfo(data.data); // 마이페이지 업데이트
        setIsEditing(false);
        setEditName('');
        setEditBio('');
        setEditAvatar('');
      }
    },
  });

  // 수정 모드로 진입할 때 기존 사용자 정보를 editName, editBio, editAvatar 상태에 복사
  const handleEdit = () => {
    if (userInfo) {
      setEditName(userInfo.name);
      setEditBio(userInfo.bio ?? '');
      setEditAvatar(userInfo.avatar ?? '');
      setIsEditing(true);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-[#1F2A36] rounded-lg text-white text-left shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🧑 마이페이지</h1>
        {!isEditing && (
          <button
            className="text-sm px-3 py-1 rounded bg-[#FFF8DC] text-[#5B3A00] hover:brightness-95"
            onClick={handleEdit}
          >
            🛠 설정
          </button>
        )}
      </div>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      {userInfo ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div
              onClick={isEditing ? handleAvatarClick : undefined}
              className="cursor-pointer relative"
            >
              {editAvatar || userInfo.avatar ? (
                <img
                  src={editAvatar || userInfo.avatar!}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover border border-gray-500"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-xl">
                  {editName || userInfo.name[0]}
                </div>
              )}
              {isEditing && (
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              )}
            </div>

            <div>
              {isEditing ? (
                <>
                  <input
                    className="text-white bg-gray-500 rounded px-2 py-1 text-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <textarea
                    className="text-white bg-gray-500 mt-1 w-full rounded px-2 py-1 text-sm"
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded"
                      disabled={!editName.trim()}
                      onClick={() =>
                        updateProfile.mutate({
                          name: editName,
                          bio: editBio,
                          avatar: editAvatar,
                        })
                      }
                    >
                      저장
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-500 text-white text-sm rounded"
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold">{userInfo.name}</p>
                  <p className="text-sm text-gray-300">{userInfo.bio || '없음'}</p>
                </>
              )}
            </div>
          </div>

          <div className="text-md">
            <p>{userInfo.email}</p>
            <p>{new Date(userInfo.createdAt).toLocaleDateString()}부터 함께했습니다.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">불러오는 중...</p>
      )}
    </div>
  );
};

export default MyPage;
