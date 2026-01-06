// hooks/useScheduleGenerator.js
import { useCallback, useMemo } from 'react';
import { 
  generateSupervisor1Schedule,
  calculateS3EntryDay,
  generateSupervisor3Schedule,
  generateSupervisor2Schedule,
  validateSchedule
} from '../utils/scheduleCalculations';

export const useScheduleGenerator = () => {
  const generateSchedule = useCallback((workDays, restDays, inductionDays, totalDrillingDays) => {
    const maxDays = Math.max(totalDrillingDays * 3, 365); // Suficiente para cubrir
        
    // 1. Generar cronograma de S1 (siempre cumple el régimen completo)
    const { schedule: s1Schedule, drillingCount: s1DrillingCount } = 
      generateSupervisor1Schedule(workDays, restDays, inductionDays, totalDrillingDays, maxDays);
    
    // 2. Calcular cuando debe entrar S3
    const s3EntryDay = calculateS3EntryDay(s1Schedule, inductionDays, workDays);
    
    // 3. Generar cronograma de S3
    const { schedule: s3Schedule, drillingCount: s3DrillingCount } = 
      generateSupervisor3Schedule(s3EntryDay, workDays, restDays, inductionDays, totalDrillingDays, maxDays);
    
    // 4. Generar cronograma de S2 (se ajusta para cumplir reglas)
    const { schedule: s2Schedule, drillingCount: s2DrillingCount } = 
      generateSupervisor2Schedule(
        s1Schedule, 
        s3Schedule, 
        workDays, 
        restDays, 
        inductionDays, 
        totalDrillingDays, 
        maxDays, 
        s3EntryDay
      );
    
    // 5. Combinar cronogramas y contar perforaciones
    const combinedSchedule = {
      s1: s1Schedule,
      s2: s2Schedule,
      s3: s3Schedule,
      drillingCount: new Array(maxDays).fill(0)
    };
    
    // Calcular perforaciones por día
    for (let day = 0; day < maxDays; day++) {
      let count = 0;
      if (s1Schedule[day] === 'P') count++;
      if (s2Schedule[day] === 'P') count++;
      if (s3Schedule[day] === 'P') count++;
      combinedSchedule.drillingCount[day] = count;
    }
    
    // 6. Validar el cronograma generado
    const validation = validateSchedule(
      combinedSchedule, 
      s3EntryDay, 
      workDays, 
      restDays, 
      inductionDays
    );
    
    return {
      schedule: combinedSchedule,
      errors: validation.errors,
      warnings: validation.warnings,
      s3EntryDay,
      isValid: validation.errors.length === 0
    };
  }, []);

  return { generateSchedule };
};