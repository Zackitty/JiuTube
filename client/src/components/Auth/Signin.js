import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, Button, FormField } from 'grommet';
import { useParams, useHistory, Redirect} from 'react-router-dom'
import SignInButton from './SignInButton'
import { signIn } from '../../store/auth'
import ErrorBox from '../../Grommet/ErrorBox'


const Signin = (props) => {
  const { toggleLast, handleSignInOut } = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  let history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(username, password))
     localStorage.setItem("UPDATE_NAV", "UPDATE")
    
  }
 
  const handleGuestSubmit = async (e) => {
    e.preventDefault()
    dispatch(signIn("Demo", "password"))
    localStorage.setItem("UPDATE_NAV", "UPDATE")
    

  }
 const handleClick = async (e) => {
   e.preventDefault()
   localStorage.setItem("UPDATE_NAV", "UPDATE")
 
 }
  return (
    <Box align="center" pad="large">
      <div>
        don't have an account? <SignInButton label="sign up here!"  />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Box margin="small">
        <Form onSubmit={handleGuestSubmit} onClickProp={handleSignInOut}>
          <Button
            type="submit"
            plain={false}
            primary
            color="#ED2D23"
            onClickProp={handleSignInOut}
           >
            sign in as guest</Button>
        </Form>
      </Box>
      <Form
        onSubmit={handleSubmit}>
        <FormField
          name="username"
          label="User Name"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)} />
        <FormField
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <Button
          type="submit"
          plain={false}
          primary
          color="#ED2D23"
          handleClick={handleClick}
          >
          sign in</Button>
      </Form>

    </Box>
  );
}

export default Signin