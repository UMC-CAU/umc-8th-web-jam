import React, { createContext, useContext } from 'react';
import { User, useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextType {
  currentUser: User | null;
  accessToken: string;
  refreshToken: string;
  isLoggedIn: boolean; // 로그인 여부
  login: (user: User, at: string, rt: string) => void; // 로그인
  logout: () => void; // 로그아웃
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [accessToken, setAccessToken] = useLocalStorage<string>('accessToken', '');
  const [refreshToken, setRefreshToken] = useLocalStorage<string>('refreshToken', '');

  const login = (user: User, at: string, rt: string) => {
    setCurrentUser(user);
    setAccessToken(at);
    setRefreshToken(rt);
  };

  const logout = () => {
    setCurrentUser(null);
    setAccessToken('');
    setRefreshToken('');
  };

  const isLoggedIn = !!currentUser && !!accessToken;

  return (
    <AuthContext.Provider
      value={{ currentUser, accessToken, refreshToken, isLoggedIn, login, logout }}
    >
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
