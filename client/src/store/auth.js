 //REQUISITE IMPORTS HERE
import { apiUrl } from '../config';

//ACTION TYPES AND LOCAL STORAGE ASSIGNMENTS
const SET_USER = 'change/auth/SET_USER';
const REMOVE_USER = 'change/auth/REMOVE_USER';
const AUTH_ERROR = 'change/auth/AUTH_ERROR'
const SESSION_TOKEN = 'SESSION_TOKEN';
const USER_ID = 'USER_ID';
const UPDATE_NAV = 'UPDATE_NAV'
const BELT_COLOR = 'BELT_COLOR'

//SIGN IN 
export const signIn = (username, password) => async dispatch => {
  try {
    //Retrieve Information from Server
    const response = await fetch(`${apiUrl}/users/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw response;
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id} = await response.json();
  
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
  
    fetch(`${apiUrl}/users/${id}`)
    .then( res=> res.json())
    .then(data => localStorage.setItem('BELT_COLOR', data.belt_color))
    dispatch(setUser(access_token, id));
    localStorage.removeItem(UPDATE_NAV)
  }
  catch (err) {
    const errJSON = await err.json()
    dispatch(handleAuthErrors(errJSON))
  }
}

//SIGN UP 
export const signUp = (username, fullname, email, belt_color,
  affiliation, password, mediaurl) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append("username", username)
    formData.append("full_name", fullname)
    formData.append("email", email)
    formData.append("belt_color", belt_color)
    formData.append("affiliation", affiliation)
    formData.append("password", password)
    formData.append("mediaurl", mediaurl)
    // if (profPic !== "") {
    //   formData.append("profPic", profPic, `${firstName}-profpic`)
    // }

    const response = await fetch(`${apiUrl}/users/signup`, {
      method: 'post',
      body: formData
    });

    if (!response.ok) {
      throw response
    }
    //Place token in Local Storage, update Redux State
    const { access_token, id  } = await response.json();
    localStorage.setItem(SESSION_TOKEN, access_token);
    localStorage.setItem(USER_ID, id);
    dispatch(setUser(access_token, id));
  }
  catch (err) {
    const errJSON = await err.json()
    dispatch(handleAuthErrors(errJSON))
  }
}

//FETCH USER DETAILS 
export const fetchUserDetails = (access_token, id) => async dispatch => {
  const res = await fetch(`${apiUrl}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('SESSION_TOKEN')}`,
    }
  })
  dispatch(setUser(access_token, id))
}

//SIGN OUT
export const signOut = () => async (dispatch) => {
  localStorage.removeItem(SESSION_TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(UPDATE_NAV)
  localStorage.removeItem(BELT_COLOR);
  dispatch(removeUser())
}


//ACTION CREATOR FUNCTIONS
export const setUser = (access_token, id) => ({
  type: SET_USER,
  access_token,
  id: Number(id)
});

export const handleAuthErrors = (errJSON) => ({
  type: AUTH_ERROR,
  errJSON
})

export const removeUser = () => ({
  type: REMOVE_USER
})


//REDUCER
export default function reducer(state = { needSignIn: true}, action) {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_USER: {
      return {
        token: action.access_token,
        id: action.id,
        needSignIn: false
      }
    }
    case AUTH_ERROR: {
      return {
        needSignIn: true,
        authErrors: action.errJSON['errors'],
      }
    }
    case REMOVE_USER: {
      return {
        needSignIn: true,
      }
    }
    default: return newState;
  }
}