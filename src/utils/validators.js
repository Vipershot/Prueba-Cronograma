// utils/validators.js
import { VALIDATION_RULES } from './constants';

export const validateInputs = (workDays, restDays, inductionDays, totalDrillingDays) => {
  const errors = [];
  const warnings = [];

  // Validaciones de error críticas
  if (inductionDays < VALIDATION_RULES.MIN_INDUCTION_DAYS || 
      inductionDays > VALIDATION_RULES.MAX_INDUCTION_DAYS) {
    errors.push(`Los días de inducción deben estar entre ${VALIDATION_RULES.MIN_INDUCTION_DAYS} y ${VALIDATION_RULES.MAX_INDUCTION_DAYS}`);
  }
  
  if (workDays - inductionDays <= 0) {
    errors.push("Los días de trabajo deben ser mayores que los días de inducción");
  }
  
  // Validaciones de advertencia
  if (restDays - 2 <= 0) {
    warnings.push("Los días de descanso real son muy pocos");
  }
  
  if (workDays > VALIDATION_RULES.MAX_WORK_DAYS) {
    warnings.push(`Los días de trabajo son mayores al máximo recomendado (${VALIDATION_RULES.MAX_WORK_DAYS})`);
  }

  return { errors, warnings };
};

export const validateSchedulePatterns = (schedule, s3EntryDay) => {
  const errors = [];
  const warnings = [];
  const maxDays = schedule.s1.length;

  for (let day = 0; day < maxDays; day++) {
    // Contar perforaciones
    let drillingCount = 0;
    if (schedule.s1[day] === 'P') drillingCount++;
    if (schedule.s2[day] === 'P') drillingCount++;
    if (schedule.s3[day] === 'P') drillingCount++;
    
    // Validar regla 1 y 2: EXACTAMENTE 2 perforando
    if (drillingCount === 3) {
      errors.push(`Día ${day}: 3 supervisores perforando`);
    }
    
    // Validar regla 3: Nunca solo 1 perforando (una vez que S3 entró)
    const s3Active = day >= s3EntryDay;
    if (s3Active && drillingCount === 1) {
      warnings.push(`Día ${day}: Solo 1 supervisor perforando`);
    }
    
    // Validar patrones inválidos
    if (day > 0) {
      validateConsecutiveStates(schedule, day, errors);
      validateInvalidTransitions(schedule, day, errors);
    }
  }

  return { errors, warnings };
};

const validateConsecutiveStates = (schedule, day, errors) => {
  ['s1', 's2', 's3'].forEach(supervisor => {
    if (schedule[supervisor][day] === 'S' && schedule[supervisor][day-1] === 'S') {
      errors.push(`Día ${day}: ${supervisor.toUpperCase()} tiene subidas consecutivas`);
    }
  });
};

const validateInvalidTransitions = (schedule, day, errors) => {
  ['s1', 's2', 's3'].forEach(supervisor => {
    if (schedule[supervisor][day] === 'B' && schedule[supervisor][day-1] === 'S') {
      errors.push(`Día ${day}: ${supervisor.toUpperCase()} sube y baja sin perforar`);
    }
  });
};