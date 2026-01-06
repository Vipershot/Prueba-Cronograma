import React from 'react';
import LegendItem from '../molecules/LegendItem';
import { STATE_COLORS } from '../../utils/constants';

const Legend = () => {
  const states = ['S', 'I', 'P', 'B', 'D'];

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 lg:p-10 border border-indigo-200/60 shadow-xl backdrop-blur-sm mb-6 md:mb-8 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
        <svg className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
        Leyenda de Estados
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        {states.map(state => (
          <LegendItem 
            key={state}
            state={state}
            color={STATE_COLORS[state]}
          />
        ))}
      </div>
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-blue-200/50">
        <h4 className="text-sm md:text-base font-semibold text-gray-700 mb-3 md:mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Validaciones de Seguridad
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-green-500 text-white flex items-center justify-center text-xs font-bold rounded-full mr-3 shadow-sm">2</div>
            <span className="text-sm md:text-base text-green-800 font-medium">Correcto (2 perforando)</span>
          </div>
          <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-200">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full mr-3 shadow-sm">3</div>
            <span className="text-sm md:text-base text-red-800 font-medium">Error (3 perforando)</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors duration-200">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-yellow-500 text-white flex items-center justify-center text-xs font-bold rounded-full mr-3 shadow-sm">1</div>
            <span className="text-sm md:text-base text-yellow-800 font-medium">Advertencia (1 perforando)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;
