import { useEffect, useState, useRef } from 'react';

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledVaue, setThrottledValue] = useState(value);
  const lastCall = useRef<number>(Date.now()); // 리렌더링 없이 함수 호출 시점의 시간을 저장 - 일반 변수를 쓰면 리렌더링마다 초기화, useState는 변경될 때마다 리렌더링

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastCall.current); // useRef로 만든 객체는 .current로 현재 저장된 값 확인 가능
    // 현재 기준으로 마지막 실행으로부터 delay가 지나기까지 얼마나 남았는지

    if (remaining <= 0) {
      // 지정된 delay가 충분히 지났다면 즉시 업데이트
      setThrottledValue(value);
      lastCall.current = now; // 주기의 시작점을 다시 현재로
    } else {
      // 아직 delay가 남았다면 남은 시간만큼 대기 후 업데이트 예약
      const timeout = setTimeout(() => {
        setThrottledValue(value);
        lastCall.current = Date.now();
      }, remaining);

      // value나 delay가 변경되면 이전 예약 취소, if문은 timer 안 만드니까 cleanUp 함수가 여기 있어도 됨
      return () => clearTimeout(timeout);
    }
  }, [value, delay]);

  // 외부에는 throttle이 적용된 값 반환
  return throttledVaue;
}
