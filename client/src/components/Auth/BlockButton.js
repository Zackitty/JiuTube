import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Layer } from 'grommet';
import './auth.css';


const BlockButton = ({ open, children, onClose }) => {
  const dispatch = useDispatch();

  const handleBlockClick= async (e) => {
    e.preventDefault()
    onClose()
    localStorage.getItem("USER_ID")
    // dispatch(addBlock(user_id, block_id))
     
    
  }
  
  if (!open) return null;

  return (
      <div >
        <button onClick={handleBlockClick}>Block User</button>
        <button onClick={onClose}>Exit</button>
        {children}
      </div>
  )
}

export default BlockButton