import React, { useState, useEffect } from 'react';
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
  const USER_ID = localStorage.getItem('USER_ID')
  const userColor = localStorage.getItem('BELT_COLOR')
  const UPDATE_NAV = localStorage.getItem('UPDATE_NAV')
  useEffect(() => {
  
    return history.push(`/`);
  }, [USER_ID, userColor, UPDATE_NAV])
  const handleOnClickUser = async (e) => {
    e.preventDefault();
    dispatch(signIn(username, password))
     localStorage.setItem("UPDATE_NAV", "UPDATE")
     return history.push('/');
  }
 
  // const handleGuestSubmit = async (e) => {
  //   e.preventDefault()
  //   dispatch(signIn("Demo", "password"))
  //   localStorage.setItem("UPDATE_NAV", "UPDATE")

  // }
  const handleOnClickGuest = async (e) => {
    e.preventDefault()
    dispatch(signIn("Demo", "password"))
    localStorage.setItem("UPDATE_NAV", "UPDATE")
    return history.push(`/`);
  }

  return (
    <Box align="center" pad="large">
      <div>
        don't have an account? <SignInButton label="sign up!" onClickProp={toggleLast}  />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Box margin="small">
        <Form >
          <Button
            type="submit"
            plain={false}
            primary
            color="#ED2D23"
            onClick={handleOnClickGuest}
           >
            sign in as guest</Button>
        </Form>
      </Box>
      <Form>
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
          onClick={handleOnClickUser}
          >
          sign in</Button>
      </Form>

    </Box>
  );
}

export default Signin