import { CHANGE_DETAIL } from '../actions';

function detail(state = [], action) {
  switch (action.type) {    
    case CHANGE_DETAIL:
      return action.detail;
    default:
      return state;
  }
}

export default detail;
