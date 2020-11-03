import { apiUrl } from '../config';

//VARIABLE DECLARATIONS
const GET_BLOCKS = 'JIUTUBE/blocks/GET_BLOCKS';
const ADD_BLOCK = 'JIUTUBE/blocks/ADD_BLOCK';
const REMOVE_BLOCK = 'JIUTUBE/blocks/REMOVE_BLOCK';

export default function reducer(state = {}, action) {
  Object.freeze(state)
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_BLOCKS: {
      return action.data
    }
    case ADD_BLOCK: {
      return action.data
    }
    case REMOVE_BLOCK: {
      return action.data
    }
    default: return newState
  }
}