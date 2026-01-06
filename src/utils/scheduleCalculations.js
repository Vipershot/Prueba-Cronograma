// utils/scheduleCalculations.js

// Función para generar cronograma de S1 (regla 4: siempre cumple el régimen completo)
export const generateSupervisor1Schedule = (workDays, restDays, inductionDays, totalDrillingDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  let day = 0;
  let drillingDaysCompleted = 0;
  const realRestDays = Math.max(0, restDays - 2);
  const totalCycleDays = workDays + restDays;
  
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    // SUBIDA (S) - Día 0 de cada ciclo
    schedule[day] = 'S';
    day++;
    
    // INDUCCIÓN (I) - Días configurados
    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      schedule[day] = `I${i+1}`;
      day++;
    }
    
    // PERFORACIÓN (P) - Completar ciclo de trabajo
    const drillingDaysPerCycle = workDays - inductionDays - 1; // -1 por la subida
    const drillingNeeded = Math.min(
      drillingDaysPerCycle,
      totalDrillingDays - drillingDaysCompleted
    );
    
    for (let i = 0; i < drillingNeeded && day < maxDays; i++) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }
    
    // Si aún no completamos los días de trabajo del ciclo, seguir perforando
    const cycleDaysSoFar = 1 + inductionDays + drillingNeeded; // S + I + P
    for (let i = cycleDaysSoFar; i < workDays && day < maxDays && drillingDaysCompleted < totalDrillingDays; i++) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }
    
    // BAJADA (B) - Fin del ciclo de trabajo
    if (day < maxDays) {
      schedule[day] = 'B';
      day++;
    }
    
    // DESCANSO (D) - Días restantes del ciclo
    for (let i = 0; i < realRestDays && day < maxDays; i++) {
      schedule[day] = 'D';
      day++;
    }
    
    // Si aún hay días libres sin asignar, completar con descanso
    const restDaysSoFar = 1 + realRestDays; // B + D
    for (let i = restDaysSoFar; i < restDays && day < maxDays; i++) {
      schedule[day] = 'D';
      day++;
    }
  }
  
  return { schedule, drillingCount };
};

// Calcular cuando debe entrar S3 (para empezar a perforar cuando S1 baja)
export const calculateS3EntryDay = (s1Schedule, inductionDays, workDays) => {
  // Encontrar el primer día en que S1 baja
  for (let day = 0; day < s1Schedule.length; day++) {
    if (s1Schedule[day] === 'B') {
      // S3 debe entrar con suficiente anticipación para completar inducción
      // Entra el día: día que S1 baja - inducción - 1 (para empezar a perforar justo cuando S1 baja)
      return Math.max(0, day - inductionDays - 1);
    }
  }
  return 0; // Por defecto
};

// Generar cronograma de S3
export const generateSupervisor3Schedule = (entryDay, workDays, restDays, inductionDays, totalDrillingDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  if (entryDay >= maxDays) return { schedule, drillingCount };
  
  let day = entryDay;
  let drillingDaysCompleted = 0;
  const realRestDays = Math.max(0, restDays - 2);
  
  // SUBIDA inicial
  if (day < maxDays) {
    schedule[day] = 'S';
    day++;
  }
  
  // INDUCCIÓN inicial
  for (let i = 0; i < inductionDays && day < maxDays; i++) {
    schedule[day] = `I${i+1}`;
    day++;
  }
  
  // PERFORACIÓN cíclica
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    // Perforar hasta completar ciclo de trabajo
    const daysInCycle = day - entryDay;
    const cyclePosition = daysInCycle % (workDays + restDays);
    
    if (cyclePosition < workDays - 1) { // -1 porque ya contamos la subida
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    } else if (cyclePosition === workDays - 1) {
      // BAJADA al final del ciclo de trabajo
      schedule[day] = 'B';
      day++;
      
      // DESCANSO
      for (let i = 0; i < realRestDays && day < maxDays; i++) {
        schedule[day] = 'D';
        day++;
      }
      
      // SUBIDA para nuevo ciclo
      if (day < maxDays) {
        schedule[day] = 'S';
        day++;
      }
      
      // INDUCCIÓN para nuevo ciclo
      for (let i = 0; i < inductionDays && day < maxDays; i++) {
        schedule[day] = `I${i+1}`;
        day++;
      }
    } else {
      // Estamos en días de descanso extra
      schedule[day] = 'D';
      day++;
    }
  }
  
  return { schedule, drillingCount };
};

// Generar cronograma de S2 (el que se ajusta dinámicamente)
export const generateSupervisor2Schedule = (
  s1Schedule, 
  s3Schedule, 
  workDays, 
  restDays, 
  inductionDays, 
  totalDrillingDays, 
  maxDays, 
  s3EntryDay
) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  let day = 0;
  let drillingDaysCompleted = 0;
  const realRestDays = Math.max(0, restDays - 2);
  
  // Empezar al mismo tiempo que S1
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    // Decidir estado basado en reglas
    const s1Drilling = s1Schedule[day] === 'P';
    const s3Drilling = s3Schedule[day] === 'P';
    
    // REGLA 1 y 2: Siempre exactamente 2 perforando, nunca 3
    if (s1Drilling && s3Drilling) {
      // Ya hay 2 perforando, S2 debe descansar
      schedule[day] = 'D';
      day++;
    } else if (!s1Drilling && !s3Drilling) {
      // Nadie está perforando, S2 debe perforar
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    } else {
      // Solo 1 perforando, S2 debe perforar para tener exactamente 2
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }
    
    // REGLA 3: Nunca solo 1 perforando (una vez que S3 entró)
    // Ajustar descansos de S2 para garantizar cobertura
    if (day >= s3EntryDay && s3Schedule[day] === 'P') {
      // Verificar si S1 también está perforando
      if (s1Schedule[day] !== 'P') {
        // S2 debe seguir perforando para acompañar a S3
        // Ajustar: cancelar cualquier bajada programada
        if (schedule[day] === 'B' || schedule[day] === 'D') {
          schedule[day] = 'P';
          drillingCount[day]++;
          drillingDaysCompleted++;
        }
      }
    }
    
    // Manejar ciclos regulares para S2
    const currentCycleDay = day % (workDays + restDays);
    if (currentCycleDay === workDays - 1 && day > 0) {
      // Fin del ciclo de trabajo - programar bajada
      if (day < maxDays) {
        schedule[day] = 'B';
        day++;
      }
      
      // Descanso mínimo
      const minRest = Math.max(1, realRestDays);
      for (let i = 0; i < minRest && day < maxDays; i++) {
        schedule[day] = 'D';
        day++;
      }
    }
  }
  
  // Ajustes post-generación para cumplir todas las reglas
  for (let day = 0; day < maxDays; day++) {
    const s1Drilling = s1Schedule[day] === 'P';
    const s2Drilling = schedule[day] === 'P';
    const s3Drilling = s3Schedule[day] === 'P';
    const drillingCount = (s1Drilling ? 1 : 0) + (s2Drilling ? 1 : 0) + (s3Drilling ? 1 : 0);
    
    // Corregir violaciones
    if (drillingCount === 3) {
      // Nunca 3 perforando - hacer que S2 descanse
      schedule[day] = 'D';
      if (s2Drilling) drillingCount[day]--;
    } else if (drillingCount === 1 && day >= s3EntryDay) {
      // Nunca solo 1 perforando cuando S3 ya entró - hacer que S2 perfore
      if (schedule[day] !== 'P') {
        schedule[day] = 'P';
        drillingCount[day]++;
      }
    } else if (drillingCount === 0 && day < maxDays - 1) {
      // Siempre exactamente 2 perforando - si nadie perfora, S2 debe perforar
      // Verificar que no sea un día de inducción o descanso programado
      if (schedule[day] !== 'S' && schedule[day] !== 'B' && !schedule[day].startsWith('I')) {
        schedule[day] = 'P';
        drillingCount[day]++;
      }
    }
  }
  
  return { schedule, drillingCount };
};

// Validar cronograma completo
export const validateSchedule = (schedule, s3EntryDay, workDays, restDays, inductionDays) => {
  const errors = [];
  const warnings = [];
  const maxDays = schedule.s1.length;
  
  for (let day = 0; day < maxDays; day++) {
    // Contar perforaciones
    const drillingCount = schedule.drillingCount[day];
    
    // REGLA 1: Siempre exactamente 2 perforando (después del inicio)
    if (day > 0 && drillingCount !== 2 && 
        schedule.s1[day] !== '-' && schedule.s2[day] !== '-' && schedule.s3[day] !== '-') {
      if (drillingCount === 1) {
        errors.push(`Día ${day}: Solo 1 supervisor perforando (viola regla 1)`);
      } else if (drillingCount === 0) {
        warnings.push(`Día ${day}: Ningún supervisor perforando`);
      }
    }
    
    // REGLA 2: Nunca 3 perforando
    if (drillingCount === 3) {
      errors.push(`Día ${day}: 3 supervisores perforando (viola regla 2)`);
    }
    
    // REGLA 3: Nunca solo 1 perforando (una vez que S3 entró)
    if (day >= s3EntryDay && drillingCount === 1) {
      errors.push(`Día ${day}: Solo 1 supervisor perforando después de que S3 entró (viola regla 3)`);
    }
    
    // Validar patrones inválidos
    if (day > 0) {
      // ERROR 2: Subida consecutiva (S-S)
      ['s1', 's2', 's3'].forEach(sup => {
        if (schedule[sup][day] === 'S' && schedule[sup][day-1] === 'S') {
          errors.push(`Día ${day}: ${sup.toUpperCase()} tiene subidas consecutivas`);
        }
      });
      
      // ERROR 3: Bajada después de subida (S-B)
      ['s1', 's2', 's3'].forEach(sup => {
        if (schedule[sup][day] === 'B' && schedule[sup][day-1] === 'S') {
          errors.push(`Día ${day}: ${sup.toUpperCase()} sube y baja sin perforar`);
        }
      });
    }
    
    // ERROR 5: Perforación de 1 solo día
    if (day > 0 && day < maxDays - 1) {
      ['s1', 's2', 's3'].forEach(sup => {
        if (schedule[sup][day] === 'P' && schedule[sup][day-1] !== 'P' && schedule[sup][day+1] !== 'P') {
          warnings.push(`Día ${day}: ${sup.toUpperCase()} perfora solo 1 día`);
        }
      });
    }
  }
  
  return { errors, warnings };
};