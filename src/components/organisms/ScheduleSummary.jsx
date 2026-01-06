// components/organisms/ScheduleSummary.js
import React from 'react';

const ScheduleSummary = ({ config, schedule, errors, warnings }) => {
  if (!schedule) return null;

  const totalDays = schedule.s1.length;
  const drillingDays = schedule.drillingCount.filter(count => count > 0).length;
  const errorDays = schedule.drillingCount.filter(count => count !== 2 && count > 0).length;
  
  const calculateCoverage = () => {
    let perfectCoverage = 0;
    let violations = 0;
    
    for (let i = 0; i < totalDays; i++) {
      if (schedule.drillingCount[i] === 2) {
        perfectCoverage++;
      } else if (schedule.drillingCount[i] === 3 || schedule.drillingCount[i] === 1) {
        violations++;
      }
    }
    
    return {
      perfectCoverage,
      violations,
      coveragePercentage: Math.round((perfectCoverage / totalDays) * 100)
    };
  };

  const coverage = calculateCoverage();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Resumen del Cronograma
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-600 font-medium mb-1">Días Totales</div>
          <div className="text-2xl font-bold text-blue-700">{totalDays}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-green-600 font-medium mb-1">Cobertura Perfecta</div>
          <div className="text-2xl font-bold text-green-700">{coverage.coveragePercentage}%</div>
          <div className="text-xs text-green-600 mt-1">{coverage.perfectCoverage} días con 2 perforando</div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="text-sm text-red-600 font-medium mb-1">Violaciones</div>
          <div className="text-2xl font-bold text-red-700">{coverage.violations}</div>
          <div className="text-xs text-red-600 mt-1">Días con 1 o 3 perforando</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-sm text-gray-600 font-medium mb-1">Días de Perforación</div>
          <div className="text-2xl font-bold text-gray-700">{drillingDays}</div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-700 mb-3">Parámetros Configurados</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-sm">
            <div className="text-gray-500">Régimen</div>
            <div className="font-medium">{config.workDays}×{config.restDays}</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Inducción</div>
            <div className="font-medium">{config.inductionDays} días</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Perforación Total</div>
            <div className="font-medium">{config.totalDrillingDays} días</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Descanso Real</div>
            <div className="font-medium">{config.restDays - 2} días</div>
          </div>
        </div>
      </div>
      
      {(errors.length > 0 || warnings.length > 0) && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 mb-3">Validaciones</h4>
          <div className="space-y-2">
            {errors.map((error, index) => (
              <div key={index} className="flex items-start text-red-600 text-sm">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            ))}
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start text-yellow-600 text-sm">
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {warning}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleSummary;