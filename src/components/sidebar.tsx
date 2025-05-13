import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import WithdrawlModal from './WithdrawlModal';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);

  const { logout } = useAuth(); // 유저 정보 초기화용
  const navigate = useNavigate();

  const deleteUser = useMutation({
    mutationFn: async () => {
      const res = await api.delete('/v1/users');
      return res.data;
    },
    onSuccess: () => {
      alert('탈퇴가 완료되었습니다.');
      logout(); // 로컬 유저 정보 제거
      navigate('/'); // 홈으로 이동
    },
    onError: (error) => {
      console.error('탈퇴 처리 실패', error);
    },
  });

  const handleConfirmDelete = () => {
    setShowModal(false);
    deleteUser.mutate();
  };

  return (
    <>
      <aside className="w-48 h-[80vh] bg-[#1B2631] text-white py-6 px-4 flex flex-col justify-between rounded-xl shadow-md">
        <div className="space-y-6 text-left">
          <Link to="/search" className="block text-sm hover:text-[#FFE8A3] transition">
            🔍 찾기
          </Link>
          <Link to="/my" className="block text-sm hover:text-[#FFE8A3] transition">
            🧑 마이페이지
          </Link>
          <Link to="/lps" className="block text-sm hover:text-[#FFE8A3] transition">
            💿 LP 목록
          </Link>
        </div>

        <button
          className="mt-6 text-sm text-gray-400 hover:text-red-400 transition text-left"
          onClick={() => setShowModal(true)}
        >
          탈퇴하기
        </button>
      </aside>

      {showModal && (
        <WithdrawlModal onConfirm={handleConfirmDelete} onCancel={() => setShowModal(false)} />
      )}
    </>
  );
}
