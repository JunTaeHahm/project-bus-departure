import { useCallback, useState } from 'react';

const useInput = (initialData) => {
  const [value, setValue] = useState(initialData);

  const handler = useCallback((e) => {
    const trimValue = e.target.value;

    setValue(trimValue.trim()); // value를 띄어쓰기 삭제 해서 설정
  }, []);

  return [value, handler, setValue];
};

export default useInput;
