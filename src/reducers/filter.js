import { CHANGE_FILTER } from '../actions';

function filter(state = 'All', action) {
  console.log(action);
  switch (action.type) {
    case CHANGE_FILTER:
      console.log(action.typePkm)
      return action.typePkm;
    default:
      return state;
  }
}

export default filter;
