import React from 'react';
import Button from '../atoms/Button';

const TestCaseButton = ({ testCase, onClick, className = '' }) => {
  const handleClick = () => {
    onClick(testCase);
  };

  return (
    <Button 
      variant="secondary" 
      onClick={handleClick}
      className={`w-full text-left justify-start ${className}`}
      size="small"
    >
      <div className="flex flex-col">
        <span className="font-medium">{testCase.name.split(':')[0]}</span>
        <span className="text-xs opacity-75">{testCase.name.split(':')[1]}</span>
      </div>
    </Button>
  );
};

export default TestCaseButton;
