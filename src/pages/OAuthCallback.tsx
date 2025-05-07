import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../hooks/useLocalStorage'; // ⬅️ User 타입 임포트 필요

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const name = searchParams.get('name');
    const userId = searchParams.get('userId');
    const email = searchParams.get('email') || 'googleuser@example.com'; // 필요시 백엔드에서 전달

    if (accessToken && refreshToken && name && userId) {
      const user: User = {
        id: userId,
        email,
        nickname: name,
        password: '', // 일단 OAuth 로그인은 빈 문자열로
      };

      login(user, accessToken, refreshToken);
      alert(`${user.nickname}님, 구글 로그인 성공!`);
      navigate('/');
    } else {
      alert('구글 로그인 실패');
      navigate('/log-in');
    }
  }, []);

  return null;
};

export default OAuthCallback;
