import { CHANGE_LOAD } from '../actions';

function loading(state = true, action) {
  switch (action.type) {
    case CHANGE_LOAD:
      return action.isLoading;
    default:
      return state;
  }
}

export default loading;
