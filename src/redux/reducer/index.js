import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  player,
  questions,
});

export default rootReducer;
