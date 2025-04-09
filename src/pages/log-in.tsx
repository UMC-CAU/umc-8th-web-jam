import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { logInSchema } from '../validations/validationSchema';

type LogInFormData = z.infer<typeof logInSchema>;

const Login = () => {
  const navigate = useNavigate(); // 이전 페이지로 이동하기 위한 Hook
  const [showPassword, setShowPassword] = useState(false);

  // useForm 훅과 zodResolver 연결
  const {
    register,
    handleSubmit, // <form> 안에 넣고, type='submit'으로 
    watch,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(logInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data: LogInFormData) => {
    console.log('입력된 데이터', data);
    alert('로그인되었습니다!');
  // 로그인 로직 (ex. localStorage 검증 등) 여기에 작성
    // 추후에 로그인 로직 이쪽에
  };

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const isEmailDisabled = !watchEmail || !!errors.email;
  const isPasswordDisabled = !watchPassword || !!errors.password;
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
        <form onSubmit={handleSubmit(handleLogin)}>
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

          <button
            type='submit'
            disabled={isEmailDisabled || isPasswordDisabled}
            className={`w-full py-2 rounded text-white 
            ${isEmailDisabled || isPasswordDisabled ? 'bg-gray-500 cursor-not-allowed pointer-events-none' : 'bg-black hover:bg-[#1B2631]'}
          `}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
