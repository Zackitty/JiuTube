import React, { useState, useEffect } from "react";
import { apiUrl, imageUrl } from "../../../../config"
import './Message.css';
import { useSelector } from 'react-redux';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, avatar }, name }) => {
  let isSentByCurrentUser = false;
  // const [color, setColor] = useState('White');
  // const userColor = localStorage.getItem('BELT_COLOR')
  // setColor(userColor)
  // const [userAvatar, setUserAvatar] = useState('')
  // const USER_ID = localStorage.getItem('USER_ID')
  // useEffect(() => {
  // fetch(`${apiUrl}/users/${USER_ID}`)
  // .then(response => response.json())
  // .then(data =>  setUserAvatar(data.avatar))
  // }, [])
  const { belt_color } = useSelector(state => state.currentUser)
  const trimmedName = name

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <img className='userAvatar' src={`${avatar}`}/>
          <div className='messageBox' id={`message${belt_color}`}>
            <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox" id={`message${belt_color}`}>
              <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
            </div>
            <img className='differentUserAvatar' src={`${avatar}`}/>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;