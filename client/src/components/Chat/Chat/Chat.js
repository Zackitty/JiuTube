import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { apiUrl, imageUrl } from "../../../config"
import './Chat.css';
import { fetchComments } from '../../../store/chat'
let socket;

const Chat = ({ location }) => {
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState('The JiuTube')
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

  const sendMessage = async (event) => {
    event.preventDefault();
    const USER_ID = localStorage.getItem('USER_ID')
    fetch(`${apiUrl}/users/${USER_ID}`)
      .then( res=> res.json())
      .then(data => setName(data.username))
      
    if(message) {
    const data = {text: message, user: name, room: room}
    socket.emit('send_message', data, () => setMessage(''));
    const userId = localStorage.getItem('USER_ID')
    const formData = new FormData();
    formData.append("message", message);
    formData.append("id", USER_ID)
    axios.post(`${apiUrl}/comments/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
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
