export const generateSupervisor1Schedule = (workDays, restDays, inductionDays, totalDrillingDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  let day = 0;
  let drillingDaysCompleted = 0;
  const realRestDays = Math.max(0, restDays - 2);
  const totalCycleDays = workDays + restDays;
  
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {

    schedule[day] = 'S';
    day++;
    

    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      schedule[day] = `I${i+1}`;
      day++;
    }
    

    const drillingDaysPerCycle = workDays - inductionDays - 1; 
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
    
    const cycleDaysSoFar = 1 + inductionDays + drillingNeeded; 
    for (let i = cycleDaysSoFar; i < workDays && day < maxDays && drillingDaysCompleted < totalDrillingDays; i++) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }
    
    if (day < maxDays) {
      schedule[day] = 'B';
      day++;
    }
    
    for (let i = 0; i < realRestDays && day < maxDays; i++) {
      schedule[day] = 'D';
      day++;
    }
    

    const restDaysSoFar = 1 + realRestDays; 
    for (let i = restDaysSoFar; i < restDays && day < maxDays; i++) {
      schedule[day] = 'D';
      day++;
    }
  }
  
  return { schedule, drillingCount };
};

export const calculateS3EntryDay = (s1Schedule, inductionDays, workDays) => {
  for (let day = 0; day < s1Schedule.length; day++) {
    if (s1Schedule[day] === 'B') {
      return Math.max(0, day - inductionDays - 1);
    }
  }
  return 0; 
};

export const generateSupervisor3Schedule = (entryDay, workDays, restDays, inductionDays, totalDrillingDays, maxDays) => {
  const schedule = new Array(maxDays).fill('-');
  const drillingCount = new Array(maxDays).fill(0);
  
  if (entryDay >= maxDays) return { schedule, drillingCount };
  
  let day = entryDay;
  let drillingDaysCompleted = 0;
  const realRestDays = Math.max(0, restDays - 2);
  
  if (day < maxDays) {
    schedule[day] = 'S';
    day++;
  }
  
  for (let i = 0; i < inductionDays && day < maxDays; i++) {
    schedule[day] = `I${i+1}`;
    day++;
  }
  
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    const daysInCycle = day - entryDay;
    const cyclePosition = daysInCycle % (workDays + restDays);
    
    if (cyclePosition < workDays - 1) { 
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    } else if (cyclePosition === workDays - 1) {
      schedule[day] = 'B';
      day++;

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
    } else {
      schedule[day] = 'D';
      day++;
    }
  }
  
  return { schedule, drillingCount };
};

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
  
  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    const s1Drilling = s1Schedule[day] === 'P';
    const s3Drilling = s3Schedule[day] === 'P';
    
    if (s1Drilling && s3Drilling) {
      schedule[day] = 'D';
      day++;
    } else if (!s1Drilling && !s3Drilling) {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    } else {
      schedule[day] = 'P';
      drillingCount[day]++;
      drillingDaysCompleted++;
      day++;
    }
    
    if (day >= s3EntryDay && s3Schedule[day] === 'P') {
      if (s1Schedule[day] !== 'P') {
        if (schedule[day] === 'B' || schedule[day] === 'D') {
          schedule[day] = 'P';
          drillingCount[day]++;
          drillingDaysCompleted++;
        }
      }
    }
    
    const currentCycleDay = day % (workDays + restDays);
    if (currentCycleDay === workDays - 1 && day > 0) {
      if (day < maxDays) {
        schedule[day] = 'B';
        day++;
      }
      
      const minRest = Math.max(1, realRestDays);
      for (let i = 0; i < minRest && day < maxDays; i++) {
        schedule[day] = 'D';
        day++;
      }
    }
  }
  
  for (let day = 0; day < maxDays; day++) {
    const s1Drilling = s1Schedule[day] === 'P';
    const s2Drilling = schedule[day] === 'P';
    const s3Drilling = s3Schedule[day] === 'P';
    const drillingCount = (s1Drilling ? 1 : 0) + (s2Drilling ? 1 : 0) + (s3Drilling ? 1 : 0);
    
    if (drillingCount === 3) {
      schedule[day] = 'D';
      if (s2Drilling) drillingCount[day]--;
    } else if (drillingCount === 1 && day >= s3EntryDay) {
      if (schedule[day] !== 'P') {
        schedule[day] = 'P';
        drillingCount[day]++;
      }
    } else if (drillingCount === 0 && day < maxDays - 1) {
      if (schedule[day] !== 'S' && schedule[day] !== 'B' && !schedule[day].startsWith('I')) {
        schedule[day] = 'P';
        drillingCount[day]++;
      }
    }
  }
  
  return { schedule, drillingCount };
};

export const validateSchedule = (schedule, s3EntryDay, workDays, restDays, inductionDays) => {
  const errors = [];
  const warnings = [];
  const maxDays = schedule.s1.length;
  
  for (let day = 0; day < maxDays; day++) {
    const drillingCount = schedule.drillingCount[day];
    
    if (day > 0 && drillingCount !== 2 && 
        schedule.s1[day] !== '-' && schedule.s2[day] !== '-' && schedule.s3[day] !== '-') {
      if (drillingCount === 1) {
        errors.push(`Día ${day}: Solo 1 supervisor perforando (viola regla 1)`);
      } else if (drillingCount === 0) {
        warnings.push(`Día ${day}: Ningún supervisor perforando`);
      }
    }
    
    if (drillingCount === 3) {
      errors.push(`Día ${day}: 3 supervisores perforando (viola regla 2)`);
    }
    
    if (day >= s3EntryDay && drillingCount === 1) {
      errors.push(`Día ${day}: Solo 1 supervisor perforando después de que S3 entró (viola regla 3)`);
    }
    
    if (day > 0) {
      ['s1', 's2', 's3'].forEach(sup => {
        if (schedule[sup][day] === 'S' && schedule[sup][day-1] === 'S') {
          errors.push(`Día ${day}: ${sup.toUpperCase()} tiene subidas consecutivas`);
        }
      });
      
      ['s1', 's2', 's3'].forEach(sup => {
        if (schedule[sup][day] === 'B' && schedule[sup][day-1] === 'S') {
          errors.push(`Día ${day}: ${sup.toUpperCase()} sube y baja sin perforar`);
        }
      });
    }
    
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
