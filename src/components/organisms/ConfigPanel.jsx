import React from 'react';
import InputGroup from '../molecules/InputGroup';
import Button from '../atoms/Button';
import TestCaseButton from '../molecules/TestCaseButton';
import { TEST_CASES } from '../../utils/constants';

const ConfigPanel = ({
  config,
  onConfigChange,
  onGenerate,
  onTestCaseSelect,
  isGenerating = false,
  errors = {},
  isFormValid = true
}) => {
  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-gray-200/50 backdrop-blur-sm animate-fade-in hover:shadow-3xl transition-all duration-300">
      <div className="mb-8 md:mb-10 lg:mb-12">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Configuración de Parámetros
            </h2>
          </div>
          {!isFormValid && (
            <span className="text-xs px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium shadow-md animate-pulse">
              ⚠️ Formulario incompleto
            </span>
          )}
        </div>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Configure los parámetros del régimen de trabajo para generar el cronograma de turnos
        </p>
      </div>
      
      <InputGroup
        workDays={config.workDays}
        setWorkDays={onConfigChange}
        restDays={config.restDays}
        setRestDays={onConfigChange}
        inductionDays={config.inductionDays}
        setInductionDays={onConfigChange}
        totalDrillingDays={config.totalDrillingDays}
        setTotalDrillingDays={onConfigChange}
        disabled={isGenerating}
        errors={errors}
      />
      
      <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200/60">
        <Button
          variant={isFormValid ? "primary" : "danger"}
          onClick={onGenerate}
          className="w-full py-4 md:py-5 text-lg md:text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
          size="large"
          disabled={isGenerating || !isFormValid}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Cronograma...
            </span>
          ) : !isFormValid ? (
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Corrija los errores primero
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Calcular Cronograma
            </span>
          )}
        </Button>

        {!isFormValid && (
          <p className="mt-4 text-sm text-red-600 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
            Complete todos los campos correctamente para habilitar el botón
          </p>
        )}
      </div>

      <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200/60">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">
            Casos de prueba predefinidos
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {TEST_CASES.map(testCase => (
            <TestCaseButton
              key={testCase.id}
              testCase={testCase}
              onClick={onTestCaseSelect}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center bg-gray-50 p-3 rounded-lg border border-gray-200">
          Seleccione un caso de prueba para cargar los parámetros automáticamente
        </p>
      </div>
    </div>
  );
};

export default ConfigPanel;
