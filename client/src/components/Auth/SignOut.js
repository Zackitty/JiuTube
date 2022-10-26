import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { signOut } from '../../store/auth'
import { useHistory } from 'react-router-dom'
const SignOut = () => {
  const dispatch = useDispatch();
  let history = useHistory()
  const UPDATE_NAV = localStorage.getItem("UPDATE_NAV")

  // Will dispatch the signout function from the store and then reload
  // elements that will change based on authentication and remove JWT and
  // user information from the store and localstorage
  const handleLogOut = async (e) => {
    await e.preventDefault()
    await localStorage.removeItem(UPDATE_NAV);
    await dispatch(signOut())
    await window.location.reload();

  }
  return (
    <div className='signOutButton__Container'>
      <Button
        sx={{
          color: 'white',
          backgroundColor: 'black',
          border: 3,
          borderColor: 'red',
          borderRadius: '20px',
          '&:hover': { backgroundColor: 'red', color: 'black' }
        }}
        className='signOutButton' onClick={handleLogOut}>Log Out</Button>
    </div>
  )
}

export default SignOut