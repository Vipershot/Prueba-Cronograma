import React, { useState, useCallback } from 'react';
import { validateInputs } from './utils/validators';
import { generateSchedule } from './utils/scheduleGenerator';
import { TEST_CASES } from './utils/constants';
import { useConfig } from './hooks/useConfig';

import AlertPanel from './components/organisms/AlertPanel';
import ScheduleTemplate from './components/templates/ScheduleTemplate';
import MainLayout from './components/templates/MainLayout';
import ConfigPanel from './components/organisms/ConfigPanel';

/**
 * Main application component for mining shift planning system
 * @returns {JSX.Element} The main app component
 */
function App() {
  const { config, fieldErrors, isFormValid, updateField, loadTestCase } = useConfig({
    workDays: 14,
    restDays: 7,
    inductionDays: 5,
    totalDrillingDays: 30
  });

  const [schedule, setSchedule] = useState(null);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSchedule = useCallback(() => {
    if (!isFormValid) {
      setErrors(['Por favor, corrija los errores en el formulario']);
      setWarnings([]);
      setSchedule(null);
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const { workDays, restDays, inductionDays, totalDrillingDays } = config;

      const validation = validateInputs(workDays, restDays, inductionDays, totalDrillingDays);

      if (validation.errors.length > 0) {
        setErrors(validation.errors);
        setWarnings(validation.warnings);
        setSchedule(null);
        setIsGenerating(false);
        return;
      }

      const result = generateSchedule(workDays, restDays, inductionDays, totalDrillingDays);

      setSchedule(result.schedule);
      setErrors(result.errors);
      setWarnings(result.warnings);
      setIsGenerating(false);
    }, 500);
  }, [config, isFormValid]);

  const handleTestCaseSelect = useCallback((testCase) => {
    loadTestCase(testCase);
    setErrors([]);
    setWarnings([]);
    setSchedule(null);
  }, [loadTestCase]);

  const allErrors = [...errors];
  if (!isFormValid && errors.length === 0) {
    allErrors.push('Por favor, corrija los errores en el formulario');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full p-4 md:p-6 lg:p-8">
      <MainLayout
        header={
          <div className="w-full text-center py-8 md:py-12 lg:py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="flex items-center justify-center mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Sistema de Planificación
                </h1>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6 text-blue-100">
                Turnos Mineros
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-5xl mx-auto px-4 leading-relaxed">
                Planificación inteligente y automática de turnos para 3 supervisores de perforación
                siguiendo reglas estrictas de seguridad operacional
              </p>
              <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm md:text-base font-medium">Siempre 2 perforando</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
                  <span className="text-sm md:text-base font-medium">Nunca 3 perforando</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-sm md:text-base font-medium">Nunca 1 perforando</span>
                </div>
              </div>
            </div>
          </div>
        }
        
        configPanel={
          <ConfigPanel
            config={config}
            onConfigChange={updateField}
            onGenerate={handleGenerateSchedule}
            onTestCaseSelect={handleTestCaseSelect}
            isGenerating={isGenerating}
            errors={fieldErrors}
            isFormValid={isFormValid}
          />
        }
        
        alerts={
          <>
            {allErrors.length > 0 && (
              <AlertPanel
                type="error"
                messages={allErrors}
                title="Errores encontrados:"
              />
            )}
            {warnings.length > 0 && (
              <AlertPanel
                type="warning"
                messages={warnings}
                title="Advertencias:"
              />
            )}
          </>
        }
        
        schedule={
          schedule && (
            <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 md:p-6 lg:p-8">
              <ScheduleTemplate
                schedule={schedule}
                config={config}
              />
            </div>
          )
        }
        
        footer={
          <div className="w-full mt-8 sm:mt-10 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <div className="container mx-auto max-w-7xl text-center">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                Sistema desarrollado para la planificación de turnos mineros
              </h3>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4">
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></span>
                  Siempre 2 perforando
                </span>
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mr-1 sm:mr-2"></span>
                  Nunca 3 perforando
                </span>
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mr-1 sm:mr-2"></span>
                  Nunca 1 perforando (S3 activo)
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default App;
