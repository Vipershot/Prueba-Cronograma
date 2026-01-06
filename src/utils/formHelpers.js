// utils/formHelpers.js
export const validateField = (field, value, min, max) => {
  if (value === '' || value === undefined) {
    return { isValid: false, error: 'Este campo es requerido' };
  }
  
  const numValue = parseInt(value, 10);
  
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Debe ser un número válido' };
  }
  
  if (min !== undefined && numValue < min) {
    return { isValid: false, error: `El valor mínimo es ${min}` };
  }
  
  if (max !== undefined && numValue > max) {
    return { isValid: false, error: `El valor máximo es ${max}` };
  }
  
  return { isValid: true, error: '' };
};

export const validateAllFields = (config) => {
  const errors = {};
  let isValid = true;

  // Definir reglas de validación para cada campo
  const rules = {
    workDays: { min: 5, max: 30 },
    restDays: { min: 4, max: 14 },
    inductionDays: { min: 1, max: 5 },
    totalDrillingDays: { min: 30, max: 180 }
  };

  Object.keys(rules).forEach(field => {
    const { min, max } = rules[field];
    const value = config[field];
    const validation = validateField(field, value, min, max);
    
    if (!validation.isValid) {
      errors[field] = validation.error;
      isValid = false;
    }
  });

  // Validación adicional: workDays debe ser mayor que inductionDays
  if (config.workDays && config.inductionDays && config.workDays <= config.inductionDays) {
    errors.workDays = 'Debe ser mayor que días de inducción';
    isValid = false;
  }

  return { isValid, errors };
};