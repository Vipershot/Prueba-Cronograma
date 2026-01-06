// components/organisms/ConfigPanel.js
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
    <div className="w-full bg-white rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Configuración de Parámetros
          </h2>
          {!isFormValid && (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
              Formulario incompleto
            </span>
          )}
        </div>
        <p className="text-sm md:text-base text-gray-600">
          Configure los parámetros del régimen de trabajo para generar el cronograma
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
      
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <Button 
          variant={isFormValid ? "primary" : "danger"}
          onClick={onGenerate}
          className="w-full py-3 md:py-4 text-base md:text-lg"
          size="large"
          disabled={isGenerating || !isFormValid}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando Cronograma...
            </span>
          ) : !isFormValid ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Corrija los errores primero
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Calcular Cronograma
            </span>
          )}
        </Button>
        
        {!isFormValid && (
          <p className="mt-3 text-sm text-red-600 text-center">
            Complete todos los campos correctamente para habilitar el botón
          </p>
        )}
      </div>
      
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 md:mb-4">
          Casos de prueba predefinidos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
          {TEST_CASES.map(testCase => (
            <TestCaseButton
              key={testCase.id}
              testCase={testCase}
              onClick={onTestCaseSelect}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Seleccione un caso de prueba para cargar los parámetros automáticamente
        </p>
      </div>
    </div>
  );
};

export default ConfigPanel;