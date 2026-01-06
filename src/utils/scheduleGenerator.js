import { validateSchedulePatterns } from './validators';

/**
 * Generates a complete schedule for 3 supervisors following mining operation rules
 * @param {number} workDays - Number of work days in the cycle (N)
 * @param {number} restDays - Total rest days in the cycle (M)
 * @param {number} inductionDays - Number of induction days
 * @param {number} totalDrillingDays - Total drilling days required
 * @returns {Object} Schedule object with supervisor arrays and validation results
 */
export const generateSchedule = (workDays, restDays, inductionDays, totalDrillingDays) => {
  const realRestDays = restDays - 2;
  const maxDays = Math.max(totalDrillingDays * 2, 200);

  const schedule = {
    s1: new Array(maxDays).fill('-'),
    s2: new Array(maxDays).fill('-'),
    s3: new Array(maxDays).fill('-'),
    drillingCount: new Array(maxDays).fill(0)
  };

  
  generateSupervisorSchedule(schedule, 's1', 0, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays);

  
  const s3EntryDay = calculateS3EntryDay(schedule.s1, inductionDays);
  const s3StartDrillingDay = s3EntryDay + 1 + inductionDays;

  
  if (s3EntryDay >= 0) {
    generateSupervisorSchedule(schedule, 's3', s3EntryDay, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays);
  }

  
  generateS2Schedule(schedule, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays, s3StartDrillingDay);

  
  updateDrillingCounts(schedule, maxDays);

  const { errors, warnings } = validateSchedulePatterns(schedule, s3EntryDay);

  return { schedule, errors, warnings, s3EntryDay };
};

/**
 * Generates schedule for a single supervisor following the cycle pattern
 * @param {Object} schedule - The schedule object
 * @param {string} supervisor - Supervisor key ('s1', 's2', 's3')
 * @param {number} startDay - Day to start the schedule
 * @param {number} workDays - Work days per cycle
 * @param {number} inductionDays - Induction days
 * @param {number} totalDrillingDays - Total drilling days needed
 * @param {number} realRestDays - Actual rest days (M - 2)
 * @param {number} maxDays - Maximum days to generate
 */
const generateSupervisorSchedule = (schedule, supervisor, startDay, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays) => {
  const sched = schedule[supervisor];
  let day = startDay;
  let drillingDaysCompleted = 0;
  const drillingDaysPerCycle = workDays - inductionDays;

  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    
    if (day < maxDays) {
      sched[day] = 'S';
      day++;
    }

    
    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      sched[day] = `I${i + 1}`;
      day++;
    }

    
    const drillingNeeded = Math.min(drillingDaysPerCycle, totalDrillingDays - drillingDaysCompleted);
    for (let i = 0; i < drillingNeeded && day < maxDays; i++) {
      sched[day] = 'P';
      drillingDaysCompleted++;
      day++;
    }

    
    const currentCycleLength = inductionDays + drillingNeeded + 1; // +1 for S
    for (let i = currentCycleLength; i < workDays && drillingDaysCompleted < totalDrillingDays && day < maxDays; i++) {
      sched[day] = 'P';
      drillingDaysCompleted++;
      day++;
    }

    
    if (day < maxDays) {
      sched[day] = 'B';
      day++;
    }

    
    for (let i = 0; i < realRestDays && day < maxDays; i++) {
      sched[day] = 'D';
      day++;
    }
  }
};

const calculateS3EntryDay = (s1Schedule, inductionDays) => {
  for (let day = 0; day < s1Schedule.length; day++) {
    if (s1Schedule[day] === 'B') {
      return Math.max(0, day - inductionDays - 1);
    }
  }
  return -1;
};

const generateS2Schedule = (schedule, workDays, inductionDays, totalDrillingDays, realRestDays, maxDays, s3StartDrillingDay) => {
  const sched = schedule.s2;
  let day = 0;
  let drillingDaysCompleted = 0;
  const drillingDaysPerCycle = workDays - inductionDays;

  while (drillingDaysCompleted < totalDrillingDays && day < maxDays) {
    
    if (day < maxDays) {
      sched[day] = 'S';
      day++;
    }

    
    for (let i = 0; i < inductionDays && day < maxDays; i++) {
      sched[day] = `I${i + 1}`;
      day++;
    }

    
    let cycleDrilling = 0;
    while (cycleDrilling < drillingDaysPerCycle && drillingDaysCompleted < totalDrillingDays && day < maxDays) {
      const currentDrillingCount = countDrillingAtDay(schedule, day, 's2');
      if (currentDrillingCount >= 2) {
        
        sched[day] = 'D';
      } else {
        sched[day] = 'P';
        drillingDaysCompleted++;
        cycleDrilling++;
      }
      day++;

      
      if (day === s3StartDrillingDay && sched[day - 1] === 'P') {
        
        sched[day - 1] = 'B';
        drillingDaysCompleted--; // Since we changed P to B
        cycleDrilling--;
        
        for (let i = 0; i < realRestDays && day < maxDays; i++) {
          sched[day] = 'D';
          day++;
        }
        
        if (day < maxDays) {
          sched[day] = 'S';
          day++;
        }
        for (let i = 0; i < inductionDays && day < maxDays; i++) {
          sched[day] = `I${i + 1}`;
          day++;
        }
        break; // Restart cycle
      }
    }

    
    while (drillingDaysCompleted < totalDrillingDays && day < maxDays && cycleDrilling < drillingDaysPerCycle) {
      const currentDrillingCount = countDrillingAtDay(schedule, day, 's2');
      if (currentDrillingCount >= 2) {
        sched[day] = 'D';
      } else {
        sched[day] = 'P';
        drillingDaysCompleted++;
        cycleDrilling++;
      }
      day++;
    }

    
    if (day < maxDays && sched[day - 1] !== 'B') {
      sched[day] = 'B';
      day++;
    }

    
    for (let i = 0; i < realRestDays && day < maxDays; i++) {
      sched[day] = 'D';
      day++;
    }
  }
};

const countDrillingAtDay = (schedule, day, excludeSupervisor = null) => {
  let count = 0;
  ['s1', 's2', 's3'].forEach(sup => {
    if (sup !== excludeSupervisor && schedule[sup][day] === 'P') count++;
  });
  return count;
};

const updateDrillingCounts = (schedule, maxDays) => {
  for (let day = 0; day < maxDays; day++) {
    schedule.drillingCount[day] = countDrillingAtDay(schedule, day);
  }
};
