import React, { useState, useEffect } from "react";
import { withAlert } from 'react-alert'
import './Input.css';
import { useHistory} from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap';
import AlertDismissible from '../../Auth/AlertDismissible'
import SignUp from '../../Auth/SignUp'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Input = ({ setMessage, sendMessage, message }) => {
  let history = useHistory()
  const alert = withAlert()
  const userColor = localStorage.getItem('BELT_COLOR')
  const USER_ID = localStorage.getItem('USER_ID')
const noUserHandler = async (e) => {
  e.preventDefault()
}

return (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    {USER_ID ?
    <button className={`button${userColor}`} onClick={e =>
    sendMessage(e)}>
      Send</button>
      :   <Popup trigger={<button className={`button${userColor}`} onClick={noUserHandler}>
          Send</button>} position="center">
      <div>Please Sign Up</div>
    </Popup>}
  </form>
)}

export default Input;