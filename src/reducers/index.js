import { combineReducers } from 'redux';
import pokemons from './pokemons';
import filter from './filter';
import message from './message';

const combinedReducer = combineReducers({
  pokemons,
  filter,
  message,
});

export default combinedReducer;
