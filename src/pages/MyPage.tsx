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
        setUserInfo(res.data.data); // Swagger 응답 기준
      } catch (err) {
        console.error(err);
        setError('유저 정보를 불러오지 못했습니다.');
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧑 마이페이지</h1>

      {error && <p className="text-red-500">{error}</p>}

      {userInfo ? (
        <div className="space-y-2 text-lg">
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <p><strong>소개:</strong> {userInfo.bio || '없음'}</p>
          <p><strong>가입일:</strong> {new Date(userInfo.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>불러오는 중...</p>
      )}
    </div>
  );
};

export default MyPage;