import React from 'react';
import LegendItem from '../molecules/LegendItem';
import { STATE_COLORS } from '../../utils/constants';

const Legend = () => {
  const states = ['S', 'I', 'P', 'B', 'D'];

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border border-indigo-200/50 shadow-lg backdrop-blur-sm mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4 flex items-center">
        <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        Leyenda de Estados
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
        {states.map(state => (
          <LegendItem 
            key={state}
            state={state}
            color={STATE_COLORS[state]}
          />
        ))}
      </div>
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-blue-200">
        <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold rounded mr-1 md:mr-2">2</div>
            <span>Correcto (2 perforando)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-100 text-red-800 flex items-center justify-center text-xs font-bold rounded mr-1 md:mr-2">3</div>
            <span>Error (3 perforando)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-100 text-yellow-800 flex items-center justify-center text-xs font-bold rounded mr-1 md:mr-2">1</div>
            <span>Advertencia (1 perforando)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
