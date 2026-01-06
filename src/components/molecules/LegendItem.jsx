import React from 'react';
import { STATE_LABELS } from '../../utils/constants';
import ColorBox from '../atoms/ColorBox';

const LegendItem = ({ state, color }) => {
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-br from-white via-gray-50 to-blue-50 px-5 py-4 rounded-xl shadow-lg border border-gray-200/60 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-100 transition-all duration-300 cursor-pointer group">
      <ColorBox color={color} size="medium" />
      <div className="flex-1">
        <div className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{STATE_LABELS[state]}</div>
        <div className="text-xs text-gray-500 font-mono font-semibold">({state})</div>
      </div>
    </div>
  );
};

export default LegendItem;
