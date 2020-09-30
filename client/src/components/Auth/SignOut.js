import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Layer } from 'grommet';
import { signOut } from '../../store/auth'
import { useHistory} from 'react-router-dom'
const SignOut = (props) => {
const dispatch = useDispatch();
let history = useHistory()
const UPDATE_NAV = localStorage.getItem("UPDATE_NAV")
const handleLogOut = async(e) => {
  e.preventDefault()
  localStorage.removeItem(UPDATE_NAV);
  dispatch(signOut())
  return history.push(`/`);

}
return (
<Button onClick={handleLogOut}>Log Out</Button>

)
}

export default SignOut