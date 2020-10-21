import { CHANGE_MESS } from '../actions';

function message(state = '', action) {
  switch (action.type) {
    case CHANGE_MESS:
      return action.message;
    default:
      return state;
  }
}

export default message;
