interface WithdralModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ onConfirm, onCancel }: WithdralModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2E2E2E] text-white p-6 rounded-lg w-80 shadow-lg text-center">
        <p className="mb-6 text-lg">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}