import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import { io } from "socket.io-client"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { useHistory} from 'react-router-dom'
import { apiUrl, imageUrl } from "../../../config"
import './Chat.css';
import { fetchComments } from '../../../store/chat'
let socket;

const Chat = ({ location }) => {

  let history = useHistory()
  const [name, setName] = useState('');
  const [room, setRoom] = useState('The JiuTube')
  const [users, setUsers] = useState('');
  const [avatar, setAvatar] = useState('')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [preLoadedMessages, setPreLoadedMessages] = useState([])
  const ENDPOINT = imageUrl;


  const { belt_color, blocks } = useSelector(state => state.currentUser)


 

  useEffect(() => {
    const USER_ID = localStorage.getItem('USER_ID')
    if(USER_ID !== null){
    fetch(`${apiUrl}/users/${USER_ID}`)
      .then( res=> res.json())
      .then(data => setName(data.username))
    fetch(`${apiUrl}/users/${USER_ID}`)
    .then( res=> res.json())
    .then(data => setName(data.username))
    fetch(`${apiUrl}/users/${USER_ID}`)
    .then( res=> res.json())
    .then(data => setAvatar(data.avatar))
  }
    
    socket = io(ENDPOINT);

    socket.emit('join_room', { username: name, room: room, userID: USER_ID })
  }, [ENDPOINT]);
    

  const USER_ID = localStorage.getItem('USER_ID')
  useEffect(() => {
    return history.push('/')
  }, [USER_ID])

  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
      console.log('........................message receieved...............................')
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

   
}, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    const USER_ID = localStorage.getItem('USER_ID')
    if(message) {
   
    const data = {text: message, user: name, room: room, belt_color: belt_color, avatar: avatar, blocks: blocks, user_id: USER_ID}
    console.log(data)
    socket.emit('send_message', data, () => setMessage(''));
    const formData = new FormData();
    formData.append("message", message);
    formData.append("id", USER_ID)
    formData.append('username', name)
    formData.append('belt_color', belt_color)
    formData.append('avatar', avatar)
    fetch(`${apiUrl}/comments`, {
      method: 'post',
      body: formData,
    })
    .then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});
  }
}

  return (
    <div className="outerContainer">
      <div className="container">
          {/* <BlockButton open={isOpen} onClose={() => setIsOpen(false)}/> */}
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;