import React from 'react';
import Legend from '../organisms/Legend';
import ScheduleGrid from '../organisms/ScheduleGrid';

const ScheduleTemplate = ({ schedule, config }) => {
  return (
    <div className="w-full space-y-8 md:space-y-10 lg:space-y-12 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 md:mb-6 shadow-2xl">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Cronograma Generado
        </h2>
        <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          Visualización completa del cronograma de los 3 supervisores con reglas de seguridad aplicadas
        </p>
      </div>
      
      <Legend />
      
      <div className="w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-gray-200/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Vista de Cronograma
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
            Mostrando primeros 60 días del cronograma. Desplácese horizontalmente para ver más días.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-inner bg-white/50 backdrop-blur-sm">
          <ScheduleGrid schedule={schedule} />
        </div>
      </div>
      
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-blue-200/50 backdrop-blur-sm">
        <div className="flex items-center mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">
            Resumen del Régimen
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-white to-blue-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Días de trabajo (N)</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{config.workDays}</p>
          </div>
          <div className="bg-gradient-to-br from-white to-green-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Días libres totales (M)</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{config.restDays}</p>
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Días de descanso real</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-purple-600">{config.restDays - 2}</p>
          </div>
          <div className="bg-gradient-to-br from-white to-orange-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Días de inducción</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-600">{config.inductionDays}</p>
          </div>
          <div className="bg-gradient-to-br from-white to-red-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Perforación por ciclo</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-600">{config.workDays - config.inductionDays}</p>
          </div>
          <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-600 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-500">Total a perforar</p>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{config.totalDrillingDays}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTemplate;
