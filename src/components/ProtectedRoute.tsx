import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  // ProtectedRoute 컴포넌트가 받을 props의 타입을 정의
  children: React.ReactNode; // 자식 요소를 감싸니까
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth(); // useAuth()로

  // 로그인 되지 않은 경우 로그인 창으로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/log-in" replace />;
  }

  return <>{children}</>; //children을 그대로 렌더링
};

export default ProtectedRoute;
