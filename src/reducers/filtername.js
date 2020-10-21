import { CHANGE_FILTER_NAME } from '../actions';

function filterName(state = '', action) {
  switch (action.type) {
    case CHANGE_FILTER_NAME:
      return action.namePkm;
    default:
      return state;
  }
}

export default filterName;
