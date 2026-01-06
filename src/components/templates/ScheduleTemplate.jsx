// components/templates/ScheduleTemplate.js
import React from 'react';
import Legend from '../organisms/Legend';
import ScheduleGrid from '../organisms/ScheduleGrid';

const ScheduleTemplate = ({ schedule, config }) => {
  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Cronograma Generado
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Visualización completa del cronograma de los 3 supervisores
        </p>
      </div>
      
      <Legend />
      
      <div className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 md:mb-3">
            Vista de Cronograma
          </h3>
          <p className="text-xs md:text-sm text-gray-500">
            Mostrando primeros 60 días del cronograma. Desplácese horizontalmente para ver más días.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>
      
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-blue-200">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
          Resumen del Régimen
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Días de trabajo (N)</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{config.workDays}</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Días libres totales (M)</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{config.restDays}</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Días de descanso real</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{config.restDays - 2}</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Días de inducción</p>
            <p className="text-xl md:text-2xl font-bold text-orange-600">{config.inductionDays}</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Perforación por ciclo</p>
            <p className="text-xl md:text-2xl font-bold text-green-600">{config.workDays - config.inductionDays}</p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-xs md:text-sm text-gray-500">Total a perforar</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">{config.totalDrillingDays}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTemplate;