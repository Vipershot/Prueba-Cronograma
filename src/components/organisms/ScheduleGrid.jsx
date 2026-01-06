import React from 'react';
import StateCell from '../atoms/StateCell';

const ScheduleGrid = ({ schedule, daysToShow = 60 }) => {
  if (!schedule) return null;

  const renderHeader = () => (
    <div className="flex border-b border-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-t-lg overflow-hidden min-w-max">
      <div className="w-12 sm:w-16 md:w-20 flex items-center justify-center font-bold py-2 sm:py-3 text-xs sm:text-sm">
        Día
      </div>
      {Array.from({ length: daysToShow }, (_, i) => (
        <div 
          key={i} 
          className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-xs font-bold border-r border-gray-700"
        >
          {i}
        </div>
      ))}
    </div>
  );

  const renderSupervisorRow = (supervisor, index) => (
    <div key={supervisor} className="flex border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 min-w-max">
      <div className="w-12 sm:w-16 md:w-20 flex items-center justify-center font-bold text-gray-700 bg-gray-50 text-xs sm:text-sm">
        S{index + 1}
      </div>
      {schedule[supervisor].slice(0, daysToShow).map((state, day) => (
        <div key={day} className="p-0.5 sm:p-1 border-r border-gray-100">
          <StateCell state={state} day={day} size="small" />
        </div>
      ))}
    </div>
  );

  const renderDrillingRow = () => (
    <div className="flex border-t-2 border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-lg overflow-hidden min-w-max">
      <div className="w-12 sm:w-16 md:w-20 flex items-center justify-center font-bold text-gray-700 py-2 sm:py-3 text-xs sm:text-sm">
        #P
      </div>
      {schedule.drillingCount.slice(0, daysToShow).map((count, day) => {
        const isError = count !== 2;
        const getCountColor = () => {
          if (count === 2) return 'bg-green-100 text-green-800';
          if (count === 3) return 'bg-red-100 text-red-800';
          return 'bg-yellow-100 text-yellow-800';
        };

        return (
          <div 
            key={day}
            className={`
              w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center 
              font-bold text-xs sm:text-sm
              border-r border-gray-200
              ${getCountColor()}
              ${isError ? 'ring-1 ring-red-300' : ''}
            `}
            title={`Día ${day}: ${count} perforando`}
          >
            {count}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-inner border border-gray-200 overflow-x-auto">
      <div className="min-w-max">
        {renderHeader()}
        {['s1', 's2', 's3'].map((supervisor, index) => 
          renderSupervisorRow(supervisor, index)
        )}
        {renderDrillingRow()}
      </div>
      
      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start sm:items-center text-xs sm:text-sm text-blue-700">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>Haga clic en cualquier celda para ver el estado del día. Colores rojos indican violaciones de las reglas. Desplácese horizontalmente para ver más días.</span>
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;
