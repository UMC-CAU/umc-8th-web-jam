import { NavLink } from 'react-router-dom'; // NavLink는 isActive 값을 자동으로 넘겨준다

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-[#FDF6EC] rounded-xl shadow-sm">
      <NavLink to="/" className="text-xl font-bold text-[#A47148]">
        려돌려돌 LP판
      </NavLink>
      <div className="space-x-4">
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
      </div>
    </nav>
  );
};

export default Navbar;
