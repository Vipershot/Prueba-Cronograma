/**
 * Validation rules for configuration inputs
 */

export const CONFIG_LIMITS = {
  workDays: { min: 5, max: 30 },
  restDays: { min: 4, max: 14 },
  inductionDays: { min: 1, max: 5 },
  totalDrillingDays: { min: 30, max: 180 }
};

export const validateField = (field, value, config) => {
  if (value === '' || value === undefined) {
    return 'Este campo es requerido';
  }

  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) {
    return 'Debe ser un número válido';
  }

  const limits = CONFIG_LIMITS[field];
  if (numValue < limits.min || numValue > limits.max) {
    return `Debe estar entre ${limits.min} y ${limits.max}`;
  }

  if (field === 'workDays' && config.inductionDays && numValue <= config.inductionDays) {
    return 'Debe ser mayor que días de inducción';
  }

  return '';
};

export const validateConfig = (config) => {
  const errors = {};
  let isValid = true;

  Object.keys(CONFIG_LIMITS).forEach(field => {
    const error = validateField(field, config[field], config);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { errors, isValid };
};