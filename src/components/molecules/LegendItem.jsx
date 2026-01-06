// components/molecules/LegendItem.js
import React from 'react';
import { STATE_LABELS } from '../../utils/constants';
import ColorBox from '../atoms/Colorbox';

const LegendItem = ({ state, color }) => {
  return (
    <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <ColorBox color={color} size="medium" />
      <div>
        <div className="font-semibold text-gray-800">{STATE_LABELS[state]}</div>
        <div className="text-xs text-gray-500 font-mono">({state})</div>
      </div>
    </div>
  );
};

export default LegendItem;