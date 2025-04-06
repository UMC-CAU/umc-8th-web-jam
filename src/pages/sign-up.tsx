import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0단계: 이메일 입력, 1단계: 비밀번호 입력
  const { values, errors, handleChange } = useForm();
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이는지 여부
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 보이는지 여부

  const isEmailDisabled = !values.email || Boolean(errors.email);
  const isPasswordDisabled =
    !values.password ||
    !values.confirmPassword ||
    Boolean(errors.password) ||
    Boolean(errors.confirmPassword);

  const handleNext = () => {
    console.log('다음 단계로');
    setStep((prev) => prev + 1); // 다음 단계로 이동
  };

  const handleSignUp = () => {
    console.log('회원가입');
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-sm">
        <div className="relative mb-6 h-8">
          <button onClick={() => navigate(-1)} className="absolute left-0 text-xl">
            ←
          </button>
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
            회원가입
          </h1>
        </div>

        {step === 0 && (
          <>
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

            <button
              onClick={isEmailDisabled ? undefined : handleNext}
              className={`w-full py-2 rounded text-white ${
                isEmailDisabled
                  ? 'bg-gray-500 cursor-not-allowed pointer-events-none'
                  : 'bg-black hover:bg-[#1B2631]'
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 1 && (
          <>
            {/* 입력했던 이메일 보여주기 */}
            <div className="flex items-center gap-2 mb-4 text-white">
              <span>📧</span>
              <span>{values.email}</span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="비밀번호를 입력해주세요!"
                value={values.password}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2 bg-transparent pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1.5 text-xl text-gray-300"
              >
                {showPassword ? '🙈' : '🙉'}
              </button>
            </div>

            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                value={values.confirmPassword}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2 bg-transparent"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1.5 text-xl text-gray-300"
              >
                {showConfirmPassword ? '🙈' : '🙉'}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>
            )}

            <button
              onClick={isPasswordDisabled ? undefined : handleNext}
              className={`w-full py-2 rounded text-white ${
                isPasswordDisabled
                  ? 'bg-gray-500 cursor-not-allowed pointer-events-none'
                  : 'bg-black hover:bg-[#1B2631]'
              }`}
            >
              가입하기
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-center items-center flex-col">
              <img src="/anonymous.jpg" className="w-80 h-80 rounded-full" />
              <input
                type={'text'}
                name='nickname'
                placeholder="닉네임을 입력하세요."
                className="w-full border p-2 rounded mb-2 mt-10 bg-transparent"
              />
              <button
                onClick={handleSignUp}
                className={`w-full py-2 rounded text-white hover:bg-[#1B2631] bg-black '
              }`}
              >
                가입하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
