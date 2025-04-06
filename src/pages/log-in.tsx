import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); // 이전 페이지로 이동하기 위한 Hook

  return (
    <div className="min-h-screen mt-30 flex justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="relative mb-6 h-8">
          <button onClick={() => navigate(-1)} className="absolute left-0 text-xl">
            ←
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            로그인
          </h1>
        </div>

        <button className="w-full border py-2 rounded mb-4 flex items-center justify-center gap-2 hover:bg-[#1B2631]">
          <img src="/google-icon.png" className="w-5 h-5" />
          구글 로그인
        </button>

        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-sm">OR</span>
          <hr className="flex-grow border-t" />
        </div>

        <input
          type="email"
          placeholder="이메일을 입력해주세요!"
          className="w-full border p-2 rounded mb-2 bg-transparent"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          className="w-full border p-2 rounded mb-4 bg-transparent"
        />

        <button className="w-full py-2 rounded bg-black text-white hover:bg-[#1B2631]">로그인</button>
      </div>
    </div>
  );
};

export default Login;
