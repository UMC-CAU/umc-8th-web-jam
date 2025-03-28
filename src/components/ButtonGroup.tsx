import React from 'react';
import Button from './Button';

interface ButtonGroupProps {
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const ButtonGroup = ({
  handleIncrement,
  handleDecrement,
}: ButtonGroupProps) => {
  return (
    <div>
      {/* <button onClick={handleIncrement}>+1 증가</button> */}
      {/* <button onClick={handleDecrement}>-1 감소</button> */}
      
      <Button onClick={handleIncrement} text='+1 증가' />
      <Button onClick={handleDecrement} text='-1 감소' />
    </div>
  );
};

export default ButtonGroup;
