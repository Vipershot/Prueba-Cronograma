import React from 'react';
import { STATE_COLORS } from '../../utils/constants';

const StateCell = ({ state, day, size = 'medium', className = '' }) => {
  const getDisplayState = (state) => {
    if (state === '-') return '';
    if (state.startsWith('I')) return 'I';
    return state;
  };

  const getBackgroundColor = () => {
    if (state.startsWith('I')) return STATE_COLORS.I;
    return STATE_COLORS[state] || STATE_COLORS['-'];
  };

  const sizes = {
    small: 'w-6 h-6 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  };

  const sizeClass = sizes[size] || sizes.medium;
  const backgroundColor = getBackgroundColor();
  const isError = state === 'P' && false;
  return (
    <div 
      className={`
        ${sizeClass} 
        ${className}
        flex items-center justify-center 
        font-semibold rounded-lg border-2 border-white
        transition-all duration-200 
        hover:scale-110 hover:z-10 hover:shadow-xl hover:rotate-3
        cursor-pointer
        ${isError ? 'ring-2 ring-red-500 ring-offset-1' : ''}
      `}
      style={{ backgroundColor }}
      title={`Día ${day}: ${state}`}
    >
      {getDisplayState(state)}
    </div>
  );
};

export default StateCell;
