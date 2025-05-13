import { useEffect, useState } from 'react';
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

  return (
    <div className="p-6 max-w-md mx-auto bg-[#1F2A36] rounded-lg text-white text-left shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🧑 마이페이지</h1>
        <button
          className="text-sm px-3 py-1 rounded bg-[#FFF8DC] text-[#5B3A00] hover:brightness-95"
        >
          🛠 설정
        </button>
      </div>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      {userInfo ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-500"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-xl">
                {userInfo.name[0]}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold">{userInfo.name}</p>
              <p className="text-sm text-gray-300">{userInfo.bio || '없음'}</p>
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