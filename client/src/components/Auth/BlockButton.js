import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Layer } from 'grommet';
import './auth.css';
import ReactDom from 'react-dom'
import { addBlock } from '../../store/auth'
import { useHistory} from 'react-router-dom'

const BlockButton = ({ open, children, onClose, userName, user_id}) => {
  const dispatch = useDispatch();
  const userArray = []
  let history = useHistory()
  // takes key from the redux store that tells what belt color the
  // user is so it can reflect that in the CSS
  const { belt_color } = useSelector(state => state.currentUser)

  // Upon blocking it dispatches a function that takes the user
  // clicked on's id from the props and takes the user blocking's
  // id from local storage and makes it so neither user can see posts
  // created by the other user
  const handleBlockClick = async (e) => {
    e.preventDefault()
    onClose()
    const my_id = localStorage.getItem("USER_ID");
    const their_id = user_id;
    dispatch(addBlock(my_id, their_id))
    dispatch(addBlock(their_id, my_id))
    window.location.reload(false);
  }
  
  // If the open prop is sent through the component will render otherwise
  // it will return null
  if (!open) return null;

  return (
      <div className="buttonsContainer">
        <button className="blockButton" id={`block${belt_color}`} onClick={handleBlockClick}>Block User</button>
        <button className="exitButton" id={`exit${belt_color}`} onClick={onClose}>Exit</button>
        {children}
      </div>
       
  )

}

export default BlockButton