import { useState } from 'react';

export type User = {
  email: string;
  password: string;
  nickname: string;
  id: number;
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  // state 초기값을 설정할 때, 로컬스토리지에서 먼저 값을 가져와본다 (컴포넌트가 처음 마운트될 떄)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key); // localStorage에서 key에 해당하는 값을 꺼냄

      // 값이 존재하면 JSON 문자열 → 객체로 변환해서 리턴
      // 없으면 초기값(initialValue)을 사용
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      // 상태값을 먼저 변경
      setStoredValue(value);
      // 로컬스토리지에도 JSON 문자열로 저장
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage 저장 에러', error);
    }
  };

  return [storedValue, setValue] as const;
}
