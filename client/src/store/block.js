// import { apiUrl } from '../config';

// //VARIABLE DECLARATIONS
// const GET_BLOCKS = 'JIUTUBE/blocks/GET_BLOCKS';
// const ADD_BLOCK = 'JIUTUBE/blocks/ADD_BLOCK';
// const REMOVE_BLOCK = 'JIUTUBE/blocks/REMOVE_BLOCK';

// export const fetchBlocks = (USER_ID) => async dispatch => {
  
//   const response = await fetch(`${apiUrl}/${USER_ID}`)
//   if (!response.ok) {
//     throw response;
//   }
//   const data = await response.json()
//   dispatch(getBlocks(data))
// }

// export const addBlock = (user_id, blocked_id) => async dispatch => {
  
//     const formData = new FormData();
//     formData.append("user_id", user_id)
//     formData.append("blocked_id", blocked_id)
    
//     // if (profPic !== "") {
//     //   formData.append("profPic", profPic, `${firstName}-profpic`)
//     // }
//     const response = await fetch(`${apiUrl}/blocks`, {
//       method: 'post',
//       body: formData
//     });
//     if (!response.ok) {
//       throw response
//     }
//     dispatch(setBlock(blocked_id));
  
// }


//   export const setBlock= (blocked_id) => ({
//     type: ADD_BLOCK,
//     blocked_id
//   })


// export default function reducer(state = {}, action) {
//   Object.freeze(state)
//   const newState = Object.assign({}, state);
//   switch (action.type) {
//     case GET_BLOCKS: {
//       action.data
//     }
//     case ADD_BLOCK: {
//       return action.blocked_id
//     }
//     default: return state
//   }
// }