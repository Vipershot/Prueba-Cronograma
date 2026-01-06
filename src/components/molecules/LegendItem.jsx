import React from 'react';
import { STATE_LABELS } from '../../utils/constants';
import ColorBox from '../atoms/ColorBox';

const LegendItem = ({ state, color }) => {
  return (
    <div className="flex items-center space-x-3 bg-gradient-to-br from-white to-gray-50 px-4 py-3 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <ColorBox color={color} size="medium" />
      <div>
        <div className="font-semibold text-gray-800">{STATE_LABELS[state]}</div>
        <div className="text-xs text-gray-500 font-mono">({state})</div>
      </div>
    </div>
  );
};

export default LegendItem;
