import { combineReducers } from 'redux';
import pokemons from './pokemons';
import filter from './filter';
import message from './message';
import loading from './loading';

const combinedReducer = combineReducers({
  pokemons,
  filter,
  message,
  loading,
});

export default combinedReducer;
