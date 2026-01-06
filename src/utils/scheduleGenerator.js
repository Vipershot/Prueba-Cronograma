// utils/scheduleGenerator.js
import { validateSchedulePatterns } from './validators';

export const generateSchedule = (workDays, restDays, inductionDays, totalDrillingDays) => {
  const realRestDays = restDays - 2;
  const maxDays = Math.max(totalDrillingDays * 2, 100);
  
  const schedule = {
    s1: new Array(maxDays).fill('-'),
    s2: new Array(maxDays).fill('-'),
    s3: new Array(maxDays).fill('-'),
    drillingCount: new Array(maxDays).fill(0)
  };

  // Programar S1
  const s1Schedule = scheduleSupervisor1(workDays, inductionDays, totalDrillingDays, realRestDays, maxDays);
  Object.assign(schedule.s1, s1Schedule.schedule);
  Object.assign(schedule.drillingCount, s1Schedule.drillingCount);

  // Calcular entrada de S3
  const s3EntryDay = calculateS3EntryDay(schedule.s1, inductionDays);
  
  // Programar S3
  const s3Schedule = scheduleSupervisor3(
    s3EntryDay, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays
  );
  Object.assign(schedule.s3, s3Schedule.schedule);
  schedule.drillingCount = addDrillingCounts(schedule.drillingCount, s3Schedule.drillingCount);

  // Programar S2
  const s2Schedule = scheduleSupervisor2(
    schedule, workDays, restDays, inductionDays, totalDrillingDays, realRestDays, maxDays, s3EntryDay
  );
  Object.assign(schedule.s2, s2Schedule.schedule);
  schedule.drillingCount = addDrillingCounts(schedule.drillingCount, s2Schedule.drillingCount);

  // Validaciones finales
  const { errors, warnings } = validateSchedulePatterns(schedule, s3EntryDay);
  
  return { schedule, errors, warnings, s3EntryDay };
};

const scheduleSupervisor1 = (workDays, inductionDays, totalDrillingDays, realRestDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  let day = 0;
  let drillingDaysCompleted = 0;
  const drillingDaysPerCycle = workDays - inductionDays;

  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    // Subida
    schedule[day] = 'S';
    day++;

    // Inducción
    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      schedule[day] = `I${i+1}`;
      day++;
    }

    // Perforación
    const drillingNeeded = Math.min(drillingDaysPerCycle, totalDrillingDays - drillingDaysCompleted);
    for (let i = 0; i < drillingNeeded && day < maxDays; i++) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }

    // Completar ciclo de trabajo
    const workDaysCompleted = inductionDays + drillingNeeded + 1;
    for (let i = workDaysCompleted; i < workDays && day < maxDays; i++) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }

    // Bajada
    if (day < maxDays) {
      schedule[day] = 'B';
      day++;
    }

    // Descanso
    for (let i = 0; i < realRestDays && day < maxDays; i++) {
      schedule[day] = 'D';
      day++;
    }
  }

  return { schedule, drillingCount };
};

const calculateS3EntryDay = (s1Schedule, inductionDays) => {
  for (let day = 0; day < s1Schedule.length; day++) {
    if (s1Schedule[day] === 'B') {
      return Math.max(0, day - inductionDays - 1);
    }
  }
  return 0;
};

const scheduleSupervisor3 = (entryDay, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  if (entryDay < 0 || entryDay >= maxDays) {
    return { schedule, drillingCount };
  }

  let day = entryDay;
  let drillingDaysCompleted = 0;
  const totalCycleDays = workDays + realRestDays + 2;

  // Subida
  schedule[day] = 'S';
  day++;

  // Inducción
  for (let i = 0; i < inductionDays && day < maxDays; i++) {
    schedule[day] = `I${i+1}`;
    day++;
  }

  // Perforación
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    schedule[day] = 'P';
    drillingCount[day]++;
    drillingDaysCompleted++;
    day++;

    // Ciclos regulares
    if ((day - entryDay) % totalCycleDays === workDays) {
      if (day < maxDays) {
        schedule[day] = 'B';
        day++;
      }

      for (let i = 0; i < realRestDays && day < maxDays; i++) {
        schedule[day] = 'D';
        day++;
      }

      if (day < maxDays) {
        schedule[day] = 'S';
        day++;
      }

      for (let i = 0; i < inductionDays && day < maxDays; i++) {
        schedule[day] = `I${i+1}`;
        day++;
      }
    }
  }

  return { schedule, drillingCount };
};

const scheduleSupervisor2 = (schedule, workDays, restDays, inductionDays, totalDrillingDays, realRestDays, maxDays, s3EntryDay) => {
  const s2Schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  const totalCycleDays = workDays + restDays;

  let day = 0;
  let drillingDaysCompleted = 0;

  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    // Subida inicial
    if (day === 0) {
      s2Schedule[day] = 'S';
      day++;
    }

    // Inducción inicial
    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      s2Schedule[day] = `I${i+1}`;
      day++;
    }

    // Perforación ajustada
    while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
      const currentDay = day;
      const drillingToday = countDrillingToday(schedule, currentDay);

      // Ajustar S2 según necesidad
      if (drillingToday >= 2) {
        s2Schedule[currentDay] = 'D';
      } else {
        s2Schedule[currentDay] = 'P';
        drillingCount[currentDay]++;
        drillingDaysCompleted++;
        
        // Verificar necesidad de ajustes especiales
        if (shouldAdjustS2(schedule, currentDay, s3EntryDay)) {
          adjustS2Schedule(s2Schedule, currentDay, realRestDays, inductionDays, maxDays);
          day += adjustS2Schedule.length || 0;
        }
      }

      day++;

      // Descanso regular
      if ((day - 1) % totalCycleDays === workDays - 1) {
        scheduleRegularRest(s2Schedule, day - 1, realRestDays, inductionDays, maxDays);
      }
    }
  }

  return { schedule: s2Schedule, drillingCount };
};

const countDrillingToday = (schedule, day) => {
  let count = 0;
  if (schedule.s1[day] === 'P') count++;
  if (schedule.s3[day] === 'P') count++;
  return count;
};

const shouldAdjustS2 = (schedule, day, s3EntryDay) => {
  return schedule.s3[day] === 'P' && schedule.s1[day + 1] !== 'P' && day >= s3EntryDay;
};

const adjustS2Schedule = (s2Schedule, startDay, realRestDays, inductionDays, maxDays) => {
  let day = startDay + 1;
  
  if (day < maxDays) {
    s2Schedule[day] = 'B';
    day++;
  }

  for (let i = 0; i < Math.max(1, realRestDays) && day < maxDays; i++) {
    s2Schedule[day] = 'D';
    day++;
  }

  if (day < maxDays) {
    s2Schedule[day] = 'S';
    day++;
  }

  for (let i = 0; i < inductionDays && day < maxDays; i++) {
    s2Schedule[day] = `I${i+1}`;
    day++;
  }

  return day - startDay - 1;
};

const scheduleRegularRest = (s2Schedule, currentDay, realRestDays, inductionDays, maxDays) => {
  let day = currentDay + 1;
  
  if (day < maxDays) {
    s2Schedule[day] = 'B';
    day++;
  }

  for (let i = 0; i < realRestDays && day < maxDays; i++) {
    s2Schedule[day] = 'D';
    day++;
  }

  if (day < maxDays) {
    s2Schedule[day] = 'S';
    day++;
  }

  for (let i = 0; i < inductionDays && day < maxDays; i++) {
    s2Schedule[day] = `I${i+1}`;
    day++;
  }
};

const addDrillingCounts = (baseCounts, additionalCounts) => {
  return baseCounts.map((count, index) => count + additionalCounts[index]);
};