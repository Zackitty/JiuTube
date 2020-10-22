import React, { useState, useEffect } from "react";
import { withAlert } from 'react-alert'
import { useSelector } from 'react-redux';
import './Input.css';
import { Box, Layer } from 'grommet';
import { useHistory} from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap';
import AlertDismissible from '../../Auth/AlertDismissible'
import SignInButton from '../../Auth/SignInButton'
import Popup from 'reactjs-popup';
import Signin from '../../Auth/Signin';
import SignUp from '../../Auth/SignUp';
import 'reactjs-popup/dist/index.css';
const Input = ({ setMessage, sendMessage, message }) => {
  let history = useHistory()
  const alert = withAlert()
  const { belt_color } = useSelector(state => state.currentUser)
  const USER_ID = localStorage.getItem('USER_ID')
  const [showIn, setShowIn] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const { needSignIn, block_list } = useSelector(state => state.currentUser)

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
    //   :   <Popup trigger={<button className={`button${userColor}`} onClick={noUserHandler}>
    //       Send</button>} position="center">
    //   <div>Please Sign Up</div>
    // </Popup>
  }
  </form>
)}

export default Input;