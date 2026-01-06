export const STATE_COLORS = {
  S: '#4A90E2',   // Azul - Subida
  I: '#F5A623',   // Naranja - Inducción
  P: '#7ED321',   // Verde - Perforación
  B: '#D0021B',   // Rojo - Bajada
  D: '#9B9B9B',   // Gris - Descanso
  '-': '#FFFFFF'  // Blanco - Vacío
};

export const STATE_LABELS = {
  S: 'Subida',
  I: 'Inducción',
  P: 'Perforación',
  B: 'Bajada',
  D: 'Descanso',
  '-': 'Vacío'
};

export const TEST_CASES = [
  { id: 1, name: 'Caso 1: 14x7, Inducción 5, 90 días', workDays: 14, restDays: 7, inductionDays: 5, totalDrillingDays: 90 },
  { id: 2, name: 'Caso 2: 21x7, Inducción 3, 90 días', workDays: 21, restDays: 7, inductionDays: 3, totalDrillingDays: 90 },
  { id: 3, name: 'Caso 3: 10x5, Inducción 2, 90 días', workDays: 10, restDays: 5, inductionDays: 2, totalDrillingDays: 90 },
  { id: 4, name: 'Caso 4: 14x6, Inducción 4, 90 días', workDays: 14, restDays: 6, inductionDays: 4, totalDrillingDays: 90 },
  { id: 5, name: 'Caso 5: 7x7, Inducción 1, 90 días', workDays: 7, restDays: 7, inductionDays: 1, totalDrillingDays: 90 }
];

export const VALIDATION_RULES = {
  MIN_INDUCTION_DAYS: 1,
  MAX_INDUCTION_DAYS: 5,
  MIN_WORK_DAYS: 5,
  MAX_WORK_DAYS: 30,
  MIN_REST_DAYS: 4,
  MAX_REST_DAYS: 14,
  MIN_DRILLING_DAYS: 30,
  MAX_DRILLING_DAYS: 180
};
