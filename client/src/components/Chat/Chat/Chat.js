import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { apiUrl, imageUrl } from "../../../config"
import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('room')
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

    socket.emit('join_room', { username: name, room: room })
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
      const data = {text: message, user: name, room: room}
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
    </div>
  );
}

export default Chat;
