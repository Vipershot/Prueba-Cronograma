import { useState, useCallback, useEffect } from 'react';
import { validateConfig, CONFIG_LIMITS } from '../utils/validationRules';

/**
 * Custom hook for managing configuration state and validation
 * @param {Object} initialConfig - Initial configuration values
 * @returns {Object} Configuration state and handlers
 */
export const useConfig = (initialConfig) => {
  const [config, setConfig] = useState(initialConfig);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const { errors, isValid } = validateConfig(config);
    setFieldErrors(errors);
    setIsFormValid(isValid);
  }, [config]);

  const updateField = useCallback((field, value, isValid = true) => {
    if (value === '') {
      setConfig(prev => ({ ...prev, [field]: '' }));
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
      return;
    }

    const numValue = typeof value === 'number' ? value : parseInt(value, 10);

    if (!isNaN(numValue) && isValid) {
      setConfig(prev => ({ ...prev, [field]: numValue }));
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    } else if (typeof value === 'string' && value !== '') {
      setConfig(prev => ({ ...prev, [field]: value }));
    }
  }, []);

  const loadTestCase = useCallback((testCase) => {
    setConfig(testCase.config);
  }, []);

  return {
    config,
    fieldErrors,
    isFormValid,
    updateField,
    loadTestCase,
    limits: CONFIG_LIMITS
  };
};