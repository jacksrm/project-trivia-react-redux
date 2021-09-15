import {
  SET_CHRONOMETER,
  RESET_TIMER,
  STOP_CHRONOMETER,
  UPDATE_TIME,
  START_CHRONOMETER,

} from '../actions/timerActions';

const INITIAL_STATE = {
  chronometer: null,
  time: 30,
};

const stopInterval = (interval) => {
  clearInterval(interval);
  return null;
};

const start = (execute) => {
  const INTERVAL = 1000;
  const chronometer = setInterval(() => {
    execute();
  }, INTERVAL);

  return chronometer;
};

const newTimer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CHRONOMETER:
    return {
      ...state,
      chronometer: action.chronometer,
    };
  case START_CHRONOMETER:
    return {
      ...state,
      chronometer: start(action.execute),
    };
  case UPDATE_TIME:
    return {
      ...state,
      time: state.time - 1,
    };
  case RESET_TIMER:
    return {
      ...INITIAL_STATE,
    };
  case STOP_CHRONOMETER:
    return {
      ...state,
      chronometer: stopInterval(state.chronometer),
    };
  default:
    return state;
  }
};

export default newTimer;
