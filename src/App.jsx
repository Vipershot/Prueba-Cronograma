import React, { useState, useCallback, useEffect } from 'react';
import { validateInputs } from './utils/validators';
import { generateSchedule } from './utils/scheduleGenerator';
import { TEST_CASES } from './utils/constants';


import AlertPanel from './components/organisms/AlertPanel';
import ScheduleTemplate from './components/templates/ScheduleTemplate';
import MainLayout from './components/templates/MainLayout';
import ConfigPanel from './components/organisms/ConfigPanel';

function App() {
  const [config, setConfig] = useState({
    workDays: 14,
    restDays: 7,
    inductionDays: 5,
    totalDrillingDays: 30
  });
  
  const [schedule, setSchedule] = useState(null);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    validateForm();
  }, [config]);

  const validateForm = () => {
    const newFieldErrors = {};
    let formIsValid = true;

    if (config.workDays === '' || config.workDays === undefined) {
      newFieldErrors.workDays = 'Este campo es requerido';
      formIsValid = false;
    } else if (config.workDays < 5 || config.workDays > 30) {
      newFieldErrors.workDays = 'Debe estar entre 5 y 30';
      formIsValid = false;
    }

    if (config.restDays === '' || config.restDays === undefined) {
      newFieldErrors.restDays = 'Este campo es requerido';
      formIsValid = false;
    } else if (config.restDays < 4 || config.restDays > 14) {
      newFieldErrors.restDays = 'Debe estar entre 4 y 14';
      formIsValid = false;
    }

    if (config.inductionDays === '' || config.inductionDays === undefined) {
      newFieldErrors.inductionDays = 'Este campo es requerido';
      formIsValid = false;
    } else if (config.inductionDays < 1 || config.inductionDays > 5) {
      newFieldErrors.inductionDays = 'Debe estar entre 1 y 5';
      formIsValid = false;
    }

    if (config.totalDrillingDays === '' || config.totalDrillingDays === undefined) {
      newFieldErrors.totalDrillingDays = 'Este campo es requerido';
      formIsValid = false;
    } else if (config.totalDrillingDays < 30 || config.totalDrillingDays > 180) {
      newFieldErrors.totalDrillingDays = 'Debe estar entre 30 y 180';
      formIsValid = false;
    }


    if (config.workDays && config.inductionDays && config.workDays <= config.inductionDays) {
      newFieldErrors.workDays = 'Debe ser mayor que días de inducción';
      formIsValid = false;
    }

    setFieldErrors(newFieldErrors);
    setIsFormValid(formIsValid);
    return formIsValid;
  };

  const handleConfigChange = useCallback((field, value, isValid = true) => {
    if (value === '') {
      setConfig(prev => ({ ...prev, [field]: '' }));
      
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
      return;
    }
    
    const numValue = typeof value === 'number' ? value : parseInt(value, 10);
    

    if (!isNaN(numValue) && isValid) {
      setConfig(prev => ({ ...prev, [field]: numValue }));
      
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    } else if (typeof value === 'string' && value !== '') {
      setConfig(prev => ({ ...prev, [field]: value }));
    }
  }, []);

  const handleGenerateSchedule = useCallback(() => {
    if (!validateForm()) {
      setErrors(['Por favor, corrija los errores en el formulario']);
      setWarnings([]);
      setSchedule(null);
      return;
    }
    
    const hasEmptyValues = Object.values(config).some(value => value === '' || value === undefined);
    const hasInvalidValues = Object.values(config).some(value => isNaN(value));
    
    if (hasEmptyValues || hasInvalidValues) {
      setErrors(['Todos los campos deben tener valores válidos']);
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
  }, [config]);

  const handleTestCaseSelect = useCallback((testCase) => {
    setConfig({
      workDays: testCase.workDays,
      restDays: testCase.restDays,
      inductionDays: testCase.inductionDays,
      totalDrillingDays: testCase.totalDrillingDays
    });
    
    setFieldErrors({});
    setErrors([]);
    setWarnings([]);
  }, []);

  const allErrors = [...errors];
  if (!isFormValid && errors.length === 0) {
    allErrors.push('Por favor, corrija los errores en el formulario');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      <MainLayout
        header={
          <div className="w-full text-center py-6 md:py-8 px-4 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto max-w-7xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
                Sistema de Planificación de Turnos Mineros
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-4xl mx-auto px-2">
                Planificación inteligente de turnos para 3 supervisores de perforación
              </p>
            </div>
          </div>
        }
        
        configPanel={
          <ConfigPanel
            config={config}
            onConfigChange={handleConfigChange}
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
