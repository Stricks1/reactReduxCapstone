import { REMOVE_POKE, CREATE_POKE } from '../actions';

function pokemons(state = [], action) {
  switch (action.type) {    
    case CREATE_POKE:
      const newState = [...state, action.pokemon];
      return newState.sort((a,b) => a.number - b.number);
    case REMOVE_POKE:
      return state.filter(pokemon => pokemon.name !== action.pokemon.name);
    default:
      return state;
  }
}

export default pokemons;
