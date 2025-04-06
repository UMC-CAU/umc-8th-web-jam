import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocalStorage, User } from '../hooks/useLocalStorage';

// 유효성 검사 스키마 - 따로 파일로 관리하는 것이 좋을까?
const signUpSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
    confirmPassword: z.string(),
    nickname: z.string().min(2, '닉네임은 2자 이상 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userList, setUserList] = useLocalStorage<User[]>('users', []);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchNickname = watch('nickname');

  const isEmailDisabled = !watchEmail || !!errors.email;
  const isPasswordDisabled =
    !watchPassword || !watchConfirmPassword || !!errors.password || !!errors.confirmPassword;
  const isNicknameDisabled = !watchNickname || !!errors.nickname;

  const handleNextStep = async () => {
    const isValid =
      (step === 0 && (await trigger('email'))) ||
      (step === 1 && (await trigger(['password', 'confirmPassword']))) ||
      (step === 2 && (await trigger('nickname')));

    if (isValid) setStep((prev) => prev + 1);
  };

  const handleSignUp = (data: SignUpFormData) => {
    const isDuplicate = userList.some((user) => user.email === data.email);
    if (isDuplicate) {
      alert('이미 존재하는 이메일입니다.');
      return;
    }
    const newUser: User = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
    setUserList([...userList, newUser]);
    alert('회원가입이 완료되었습니다!');
    navigate('/log-in');
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

        <form onSubmit={handleSubmit(handleSignUp)}>
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
                placeholder="이메일을 입력해주세요!"
                {...register('email')}
                className="w-full border p-2 rounded mb-1 bg-transparent"
              />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

              <button
                type="button"
                onClick={handleNextStep}
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
              <div className="flex items-center gap-2 mb-4 text-white">
                <span>📧</span>
                <span>{getValues('email')}</span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력해주세요!"
                  {...register('password')}
                  className="w-full border p-2 rounded mb-2 bg-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1.5 text-xl text-gray-300"
                >
                  {showPassword ? '🙈' : '🙉'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
              )}

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력해주세요!"
                  {...register('confirmPassword')}
                  className="w-full border p-2 rounded mb-2 bg-transparent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1.5 text-xl text-gray-300"
                >
                  {showConfirmPassword ? '🙈' : '🙉'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                className={`w-full py-2 rounded text-white ${
                  isPasswordDisabled
                    ? 'bg-gray-500 cursor-not-allowed pointer-events-none'
                    : 'bg-black hover:bg-[#1B2631]'
                }`}
              >
                다음
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex justify-center items-center flex-col">
                <img src="/anonymous.jpg" className="w-80 h-80 rounded-full" />
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요."
                  {...register('nickname')}
                  className="w-full border p-2 rounded mb-2 mt-10 bg-transparent"
                />
                {errors.nickname && (
                  <p className="text-red-500 text-sm mb-2">{errors.nickname.message}</p>
                )}
                <button
                  type="submit"
                  disabled={isNicknameDisabled}
                  className={`w-full py-2 rounded text-white ${
                    isNicknameDisabled
                      ? 'bg-gray-500 cursor-not-allowed pointer-events-none'
                      : 'bg-black hover:bg-[#1B2631]'
                  }`}
                >
                  가입하기
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
