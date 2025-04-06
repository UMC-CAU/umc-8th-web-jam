import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const Login = () => {
  const navigate = useNavigate(); // 이전 페이지로 이동하기 위한 Hook
  const { values, errors, handleChange, validate } = useForm();

  const handleLogin = () => {
    if (validate()) {
      console.log('로그인 시도:', values);
    }
    // 추후에 로그인 로직 이쪽에
  };

  const isDisabled =
    !values.email || // 이메일 입력이 비어 있으면 true → 버튼 비활성화
    !values.password || // 비밀번호 입력이 비어 있으면 true → 버튼 비활성화
    Boolean(errors.email) || // 이메일 형식이 잘못되었을 경우 errors.email에 문자열이 있으므로 → true → 버튼 비활성화
    Boolean(errors.password); // 비밀번호 유효성 검사 실패 시 → true → 버튼 비활성화
  // errors.email, errors.password가 string | undefined 타입이라 Boolean으로 감싸야 함

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
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
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          구글 로그인
        </button>

        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-sm">OR</span>
          <hr className="flex-grow border-t" />
        </div>

        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요!"
          value={values.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1 bg-transparent"
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요!"
          value={values.password}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-1 bg-transparent"
        />
        {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

        <button
          onClick={isDisabled ? undefined : handleLogin}
          className={`w-full py-2 rounded text-white 
            ${isDisabled ? 'bg-gray-500 cursor-not-allowed pointer-events-none' : 'bg-black hover:bg-[#1B2631]'}
          `}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
