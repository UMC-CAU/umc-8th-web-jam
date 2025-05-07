import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-48 bg-[#1B2631] text-white py-6 px-4 flex flex-col justify-between rounded-l-xl shadow-md">
      <div className="space-y-6 text-left">
        <Link to="/search" className="block text-sm hover:text-[#FFE8A3] transition text-left">
          🔍 찾기
        </Link>
        <Link to="/my" className="block text-sm hover:text-[#FFE8A3] transition text-left">
          🧑 마이페이지
        </Link>
        <Link to="/lps" className="block text-sm hover:text-[#FFE8A3] transition text-left">
          💿 LP 목록
        </Link>
      </div>
    </aside>
  );
}
