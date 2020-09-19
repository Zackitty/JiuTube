import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { apiUrl, imageUrl } from "../../../config"
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const room = 'room'
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = imageUrl;

  
  useEffect(() => {
    const USER_ID = localStorage.getItem('USER_ID')
    fetch(`${apiUrl}/users/${USER_ID}`)
      .then( res=> res.json())
      .then(data => setName(data.username))
    

    
    socket = io(ENDPOINT);

    socket.emit('join', { name }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT]);
    

  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

   
}, []);
console.log(messages)
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      const data = {text: message, user: name}
      socket.emit('send_message', data, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
