import { apiUrl } from '../config';

//VARIABLE DECLARATIONS
const GET_CHAT = 'JIUTUBE/comments/GET_Chat';

//PRIMARY FUNCTIONS

//GET USERS
export const fetchComments = () => async dispatch => {
  const response = await fetch(`${apiUrl}/comments`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getComments(data))
}

//ACTION CREATORS
export const getComments = (data) => ({
  type: GET_CHAT,
  data
})

//REDUCER
export default function reducer(state = {}, action) {
  Object.freeze(state)
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CHAT: {
      return action.data
    }
    default: return newState
  }
}