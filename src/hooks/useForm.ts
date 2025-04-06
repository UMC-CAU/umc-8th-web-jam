import { useState } from 'react';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  // 에러가 있을 땐 string 메시지, 없으면 undefined
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export const useForm = () => {
  // 입력값 상태 관리
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 에러 메시지 상태 관리
  const [errors, setErrors] = useState<FormErrors>({});

  // 모든 input의 onChange 이벤트를 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 현재 입력된 값으로 전체 values 업데이트
    const updatedValues = { ...values, [name]: value };
    setValues(updatedValues);

    const newErrors: FormErrors = { ...errors };

    // 이메일 검증 (원한다면 여기에 정규식 추가 가능)
    if (name === 'email') {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      } else {
        delete newErrors.email;
      }
    }

    // 비밀번호 길이 검사
    if (name === 'password') {
      if (value.length < 8) {
        newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
      } else {
        delete newErrors.password;
      }

      // password 변경 시 confirmPassword도 다시 확인
      if (updatedValues.confirmPassword && updatedValues.confirmPassword !== value) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    // 비밀번호 재확인 검사
    if (name === 'confirmPassword') {
      if (value !== updatedValues.password) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  return {
    values,
    errors,
    handleChange,
  };
};
