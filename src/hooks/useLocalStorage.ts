import { useState } from 'react';

export type User = {
  email: string;
  password?: string;
  nickname: string;
  id: number;
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      // 문자열이면 그대로, JSON이면 파싱
      if (item === null) return initialValue;
      if (typeof initialValue === 'string') return item as unknown as T;

      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);

      if (typeof value === 'string') {
        window.localStorage.setItem(key, value); // 문자열은 그대로 저장
      } else {
        window.localStorage.setItem(key, JSON.stringify(value)); // 객체 등은 stringify
      }
    } catch (error) {
      console.error('localStorage 저장 에러', error);
    }
  };

  return [storedValue, setValue] as const;
}
