import React, { useState, useEffect } from "react";
import { withAlert } from 'react-alert'
import { useSelector } from 'react-redux';
import './Input.css';
import { Box, Layer } from 'grommet';
import { useHistory} from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap';
import AlertDismissible from '../../Auth/AlertDismissible'
import SignInButton from '../../Auth/SignInButton'
import Signin from '../../Auth/Signin';
import SignUp from '../../Auth/SignUp';

const Input = ({ setMessage, sendMessage, message }) => {
  let history = useHistory()
  const alert = withAlert()
  const { belt_color } = useSelector(state => state.currentUser)
  const USER_ID = localStorage.getItem('USER_ID')
  const [showIn, setShowIn] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const { needSignIn, block_list } = useSelector(state => state.currentUser)


  // If the user logins in and turns the redux store key of Need Sign In
  // from true to false, the sign up screen modal will close and they 
  // can participate in the chat
  useEffect(() => {
    if (!needSignIn) {
      close()
    }
   
  }, [needSignIn])

  const close = () => {
    setShowIn(false)
    setShowUp(false)
  }

  
  const toggleLast = () => {
    if (!showIn && !showUp) {
      setShowUp(false)
      setShowIn(true)
  
    } else if (!showIn && showUp) {
      setShowUp(false)
      setShowIn(true)
  
    } else if (showIn && !showUp) {
      setShowIn(false)
      setShowUp(true)
  
    }
  }
const noUserHandler = async (e) => {
  e.preventDefault()
 
}

return (

  <form className="form">
  {/* Onchange whatever the user types will be set to the state and
      on a keypress sevent if the user has their id in local storage 
      the message will go through the SendMessage Function prop but
      if their id is not in the storage it will show null  */}
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => USER_ID? event.key === 'Enter' ? sendMessage(event) : null : null}
    />

    
    {USER_ID ?
    <button className={`button${belt_color}`} onClick={e =>
    sendMessage(e)}>
      Send</button>
      :
      
      <Box>
      {/* if no user_id upon clicking the send utton rather than sending 
      the message through the sendMessage function prop it will toggle
      the signup/sign in modal so that the user can sign in or sign up
      and start participating in the chat*/}
     <div  onClick={noUserHandler}>
      <button
        label={'Sign In'}
        className={`button${belt_color}`} 
        onClick={() => {toggleLast() }} >Send</button>
        </div>
        
      {(showIn || showUp) && (
        <Layer
          onEsc={() => close()}
          onClickOutside={() => close()}
        >
          {showIn ?
            (
              <Signin toggleLast={toggleLast} />
            ) : (
              <SignUp toggleLast={toggleLast} />
            )
          }
        </Layer>
      )}
    </Box>
  }
  </form>
)}

export default Input;