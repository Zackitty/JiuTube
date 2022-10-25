import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Layer } from 'grommet';
import './auth.css';
import Signin from './Signin';
import SignUp from './SignUp';

const SignInButton = (props) => {

  const [showIn, setShowIn] = useState(false)
  const [showUp, setShowUp] = useState(false)
  const { onClickProp } = props
  const { needSignIn } = useSelector(state => state.currentUser)


  // If user is authenticated and no longer has the the key in their redux
  // store  saying they need to sign in set to true, this component will 
  // automatically close due to the variable in the dependency array
  useEffect(() => {
    if (!needSignIn) {
      close()
    }
  }, [needSignIn])


  const close = () => {
    setShowIn(false)
    setShowUp(false)
  }

  // Will toggle whether the button will show that they can press login
  // or sign in
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

  return (
    <Box>

      <button
        label={'Sign In'}
        className={'signInButton'}
        onClick={() => { onClickProp ? onClickProp() : toggleLast() }} >Sign In!</button>

      {(showIn || showUp) && (
        <Layer
          onEsc={() => close()}
          onClickOutside={() => close()}
        >
          {/* toggle whether the sign in or sign up modal is shown */}
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
  )
}

export default SignInButton;