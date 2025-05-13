import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { signUpSchema } from '../validations/validationSchema';
import api from '../utils/api';

// 유효성 검사 스키마 - 따로 파일로 관리하는 것이 좋을까?

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //useForm 훅과 zodResolver 연결
  const {
    register, // 해당 필드의 값을 상태에 등록하고 추적할 수 있게 함 (input 요소와 react-hook-form 연결)
    handleSubmit, // 내부적으로 zodResolver를 통해 유효성 검사를 먼저 수행
    // 유효하면 onSubmit에 들어오는 함수 실행
    // 유효하지 않으면 errors 자동 반영하고 함수 실행 안 함
    trigger,
    // 수동으로 특정 필드의 유효성 검사를 실행
    getValues,
    watch,
    formState: { errors }, // 각 필드의 유효성 검사 결과가 담긴 객체
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), //zodResolver로 유효성 검사를 zod에 위임
    mode: 'onChange', // 실시간 검증
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
    // trigger를 통해 각 스텝에서 해당 필드만 검사
    const isValid =
      (step === 0 && (await trigger('email'))) ||
      (step === 1 && (await trigger(['password', 'confirmPassword']))) ||
      (step === 2 && (await trigger('nickname')));

    if (isValid) setStep((prev) => prev + 1);
  };

  const signUpMutation = useMutation({
    mutationFn: async (data: SignUpFormData) => {
      const body = {
        name: data.nickname,
        email: data.email,
        password: data.password,
        bio: '', // 선택사항, 일단 빈 문자열
        avatar: '', // 선택사항, 일단 빈 문자열
      };
      const res = await api.post('/v1/auth/signup', body);
      return res.data;
    },
    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
      navigate('/log-in');
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  const handleSignUp = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
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
