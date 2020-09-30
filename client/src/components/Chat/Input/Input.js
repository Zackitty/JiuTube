import React, { useState, useEffect } from "react";

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const [color, setColor] = useState('White');
  // const userColor = localStorage.getItem('BELT_COLOR')
  // setColor(userColor)

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
    <button className={`button${color}`} onClick={e => sendMessage(e)}>Send</button>
  </form>
)}

export default Input;