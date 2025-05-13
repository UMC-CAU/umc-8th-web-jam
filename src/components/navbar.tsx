import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 로그인 상태 확인용
import { useMutation } from '@tanstack/react-query';
import api from '../utils/api';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { isLoggedIn, logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/v1/auth/signout');
    },
    onSuccess: () => {
      logout(); // localStorage 정리 (AuthContext)
      navigate('/'); // 홈으로 이동
      alert('로그아웃되었습니다.');
    },
  });

  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-[#FDF6EC] text-[#5B3A00] rounded-b-xl shadow-sm">
      <button onClick={toggleSidebar} className="text-xl md:hidden">
        ☰
      </button>

      <NavLink to="/" className="text-xl font-bold text-[#A47148]">
        려돌려돌 LP판
      </NavLink>

      <div className="space-x-2 flex items-center">
        {isLoggedIn ? (
          <>
            <NavLink to="/my">
              <button className="px-3 py-1 text-sm text-[#5B3A00] bg-[#FFF8DC] border border-[#FDE7A3] rounded-md shadow-sm hover:bg-[#FDE7A3] hover:text-[#1B2631] transition">
                {currentUser?.nickname ? `${currentUser.nickname}님, 반가워요` : '마이페이지'}
              </button>
            </NavLink>
            <button
              onClick={() => logoutMutation.mutate()}
              className="px-3 py-1 text-sm font-medium text-white bg-[#2C3E50] rounded hover:bg-[#1B2631] transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/log-in">
              <button className="px-3 py-1 text-sm font-medium text-white bg-[#2C3E50] rounded hover:bg-[#1B2631] transition">
                로그인
              </button>
            </NavLink>
            <NavLink to="/sign-up">
              <button className="px-3 py-1 text-sm font-medium text-[#2C3E50] border border-[#2C3E50] rounded hover:bg-[#2C3E50] hover:text-white transition">
                회원가입
              </button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
