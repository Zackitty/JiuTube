import React, { useState, useEffect } from "react";

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const [color, setColor] = useState('White');
  // const userColor = localStorage.getItem('BELT_COLOR')
  // setColor(userColor)
  const trimmedName = name

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className='messageBox' id={`message${color}`}>
            <p className="messageText" id={`color${color}`}>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox" id={`message${color}`}>
              <p className="messageText" id={`color${color}`}>{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;