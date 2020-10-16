import { CHANGE_FILTER } from '../actions';

function filter(state = 'All', action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.typePkm;
    default:
      return state;
  }
}

export default filter;
