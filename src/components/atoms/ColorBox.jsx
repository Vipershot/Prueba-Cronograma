// components/atoms/ColorBox.js
import React from 'react';

const ColorBox = ({ color, size = 'medium', border = true, className = '' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };
  
  const borderClass = border ? 'border border-gray-300' : '';
  const sizeClass = sizes[size] || sizes.medium;

  return (
    <div 
      className={`${sizeClass} ${borderClass} rounded ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorBox;