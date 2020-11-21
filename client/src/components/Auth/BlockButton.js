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
  console.log('')
  const { belt_color } = useSelector(state => state.currentUser)
  const handleBlockClick = async (e) => {
    e.preventDefault()
    onClose()
    const my_id = localStorage.getItem("USER_ID");

 const their_id = user_id;
     dispatch(addBlock(my_id, their_id))
     dispatch(addBlock(their_id, my_id))
     window.location.reload(false);

  }
  
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