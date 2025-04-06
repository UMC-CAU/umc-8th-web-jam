import { useState } from 'react';

type FormValues = {
  email: string;
  password: string;
};

type FormErrors = {
  // 에러가 있을 땐 string 메시지, 없으면 undefined
  email?: string;
  password?: string;
};

export const useForm = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input에서 name과 value를 추출 (name은 "email" 또는 "password")
    const { name, value } = e.target; // { "email" : "123@example.com"}

    // 기존 입력값들은 그대로 두고, 지금 바뀐 input 하나만 업데이트
    setValues((prev) => ({ ...prev, [name]: value }));

    // 이메일 유효성 검사
    if (name === 'email') {
      // 이메일 형식 정규식
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: '올바른 이메일 형식을 입력해주세요.' }));
      } else {
        // 에러가 없는 경우
        //이메일 에러를 현재 에러들에서 제거
        setErrors((prev) => {
          const { email, ...rest } = prev;
          return rest;
        });
      }
    }

    // 비밀번호 유효성 검사
    if (name === 'password') {
      if (value.length < 8) {
        setErrors((prev) => ({ ...prev, password: '비밀번호는 8자 이상이어야 합니다.' }));
      } else {
        // 에러가 없는 경우
        // 비밀번호 에러를 현재 에러들에서 제거
        setErrors((prev) => {
          const { password, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(values.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }

    if (values.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};
