import React, { useState, useEffect } from "react";

import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import Message from './Message/Message';
import { apiUrl, imageUrl } from "../../../config"
import './Messages.css';

const Messages = ({ messages, name }) => {

  const [initialMessages, setInitialMessages] = useState([]);
  const ENDPOINT = imageUrl;

  useEffect(() => {
   
    fetch(`${apiUrl}/comments`)
      .then(response => response.json())
      .then(data => setInitialMessages(data))

  }, [ENDPOINT]);
  const initialArray = []
  for ( var key in initialMessages) {
    initialArray.push(initialMessages[key])
  }
  console.log(initialArray)

  return (
  <ScrollToBottom className="messages">
    {initialArray.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);}

export default Messages;