import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean; // 로그인 여부
  login: () => void; // 로그인
  logout: () => void; // 로그아웃
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 상태 여부

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthContext의 값을 가져오는 작업 처리
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider'); // AuthProvider 바깥에서 잘못 사용할 경우 에러를 던져서 방지
  return context;
};