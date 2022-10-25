import React, { useState, useEffect } from "react";

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import { apiUrl, imageUrl } from "../../../config"
import './Messages.css';
import { useHistory } from 'react-router-dom'

const Messages = ({ messages, name }) => {

  let history = useHistory()
  const [initialMessages, setInitialMessages] = useState([]);
  const [blocks, setBlocks] = useState([])
  const USER_ID = localStorage.getItem('USER_ID')
  const ENDPOINT = imageUrl;
  const UPDATE_NAV = localStorage.getItem("UPDATE_NAV")
  useEffect(() => {
    fetch(`${apiUrl}/blocks/${USER_ID}`)
      .then(response => response.json())
      .then(data => setBlocks(data))

    fetch(`${apiUrl}/comments`)
      .then(response => response.json())
      .then(data => setInitialMessages(data))
    return history.push('/')
  }, [ENDPOINT, UPDATE_NAV]);
  const initialArray = []
  for (var key in initialMessages) {
    initialArray.push(initialMessages[key])
  }
  const blockedArray = []
  for (var key in blocks) {
    blockedArray.push(blocks[key])
  }


  return (
    <ScrollToBottom className="messages">
      {initialArray.map((message, i) => <div className="messagesClassDiv" key={i}><Message message={message} name={name} blockedArray={blockedArray} /></div>)}
      {messages.map((message, i) => <div key={i} className="messagesClassDiv" ><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
  );
}

export default Messages;