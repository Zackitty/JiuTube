import React, { useState, useEffect } from "react";
import { apiUrl, imageUrl } from "../../../../config"
import './Message.css';
import BlockButton from "../../../Auth/BlockButton"
import { useSelector } from 'react-redux';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, avatar, belt_color, user_id }, name }) => {
  let isSentByCurrentUser = false;
 const [isBlocked, setIsBlocked] = useState(false);
let blockedArray = [];
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
  const { blocks } = useSelector(state => state.currentUser)
  const trimmedName = name
  
  const [isOpen, setIsOpen] = useState(false)
 const handleBlock = async (e) => {
   e.preventDefault()
   setIsOpen(true)
 } 
  useEffect(() => {
  checkBlocks()
    }, [user])
    
    const checkBlocks = async ()=> {
      for (const blocked in blocks){
        await fetch(`${apiUrl}/users/${blocks[blocked]}`)
        .then(response => response.json())
        .then(data => blockedArray.push(data.username))}
        blockedArray.forEach(blockedName => {
          if (blockedName === user){
            setIsBlocked(true)
          }
        })
    }

 
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
console.log(isBlocked)
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <img className='userAvatar'  src={`${avatar}`}/>
          <div className='messageBox' id={`message${belt_color}`}>
            <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : [(isBlocked ? null : (
          <div className="messageContainer justifyStart">
            <div className="messageBox" id={`message${belt_color}`}>
              <p className="messageText" id={`color${belt_color}`}>{ReactEmoji.emojify(text)}</p>
            </div>
        <img className='differentUserAvatar' onClick={handleBlock}src={`${avatar}`} />
            <p className="sentText pl-10 ">{user}</p>
            <BlockButton open={isOpen} userName={user} user_id={user_id} onClose={() => setIsOpen(false)}/>
          </div>
          
        ))]
       
        
  );
}

export default Message;