import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value); // debounce 처리된 값 (입력 후 delay만큼 지연된 값)

  // delay만큼 후에 query 값을 debouncedQuery에 저장
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 값이 바뀔 때마다 타이머 초기화
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
