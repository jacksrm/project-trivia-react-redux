export const SET_CHRONOMETER = 'SET_CHRONOMETER';
export const UPDATE_TIME = 'UPDATE_TIME';
export const RESET_TIMER = 'RESET_TIMER';
export const STOP_CHRONOMETER = 'STOP_CHRONOMETER';
export const START_CHRONOMETER = 'START_CHRONOMETER';

export const setChronometer = (chronometer) => ({
  type: SET_CHRONOMETER,
  chronometer,
});

export const updateTime = () => ({
  type: UPDATE_TIME,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});

export const stopChronometer = () => ({
  type: STOP_CHRONOMETER,
});

export const startChronometer = (execute) => ({
  type: START_CHRONOMETER,
  execute,
});
