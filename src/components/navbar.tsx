import { NavLink, useNavigate } from 'react-router-dom'; // isActive 사용 가능
import { useAuth } from '../context/AuthContext'; // 로그인 상태 확인용

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 홈으로 이동
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[#FDF6EC] rounded-xl shadow-sm">
      <NavLink to="/" className="text-xl font-bold text-[#A47148]">
        려돌려돌 LP판
      </NavLink>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <NavLink to="/my">
              <button className="px-4 py-2 text-sm text-[#5B3A00] bg-[#FFF8DC] border border-[#FDE7A3] rounded-md shadow-sm hover:bg-[#FDE7A3] hover:text-[#1B2631] transition">
                👤 {currentUser?.nickname || '마이페이지'}
              </button>
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-[#2C3E50] rounded hover:bg-[#1B2631] transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/log-in">
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#2C3E50] rounded hover:bg-[#1B2631] transition">
                로그인
              </button>
            </NavLink>
            <NavLink to="/sign-up">
              <button className="px-4 py-2 text-sm font-medium text-[#2C3E50] border border-[#2C3E50] rounded hover:bg-[#2C3E50] hover:text-white transition">
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