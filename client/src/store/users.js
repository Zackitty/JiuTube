import { apiUrl } from '../config';

//VARIABLE DECLARATIONS
const GET_USERS = 'change/users/GET_USERS';

//PRIMARY FUNCTIONS

//GET USERS
export const fetchUsers = () => async dispatch => {
  const response = await fetch(`${apiUrl}/users`)
  if (!response.ok) {
    throw response;
  }

  const data = await response.json()
  dispatch(getUsers(data))
}

//ACTION CREATORS
export const getUsers = (data) => ({
  type: GET_USERS,
  data
})

//REDUCER
export default function reducer(state = {}, action) {
  Object.freeze(state)
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_USERS: {
      return action.data
    }
    default: return newState
  }
}