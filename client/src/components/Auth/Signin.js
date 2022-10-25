import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, FormField } from 'grommet';
import { useHistory } from 'react-router-dom'
import SignInButton from './SignInButton'
import { signIn } from '../../store/auth'
import ErrorBox from '../../Grommet/ErrorBox'
import Button from '@mui/material/Button';


const Signin = (props) => {
  const { toggleLast } = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  let history = useHistory()
  const USER_ID = localStorage.getItem('USER_ID')


  // if you  sign in the store will place your user_id into local 
  // which will get caught as a change to the variable USER_ID in 
  // use effect's dependency array which reload parts of the page
  // with the css changed to reflect the belt color of the User
  useEffect(() => {
    return history.push('/')
  }, [USER_ID])

  // Handles the user clicking sign in by catching their name and
  // password from the state. If there's a problem with their login
  // the Errorbox component will be revealed showing the user what 
  // details they left out

  const handleOnClickUser = async (e) => {
    e.preventDefault()
    dispatch(signIn(username, password))
  }

  // Will work the same as the handle user clicker but will put in
  // premade credentials allowing someone to see how the site behaves
  // with an authorized user

  const handleOnClickGuest = async (e) => {
    e.preventDefault()
    dispatch(signIn("Demo", "password"))
    localStorage.setItem("UPDATE_NAV", "UPDATE")
    return history.push('/signin');
  }


  return (
    <Box id="signInBox" align="center" pad="large">
      <div>
        {/* if you click this will this will toggle the sign in each time to say sign up 
        sign in everytime it is toggled*/}
        don't have an account? <SignInButton id="actualSignIn" label="sign up!" buttonLabel={'SIGN UP!'} onClickProp={toggleLast} />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Box margin="small">
        <Form >
          {/*if you're just looking to test out the app this will login
          with seeder data*/}
          <Button
        sx={{
          color: 'white',
          backgroundColor: 'black',
          border: 3,
          borderColor: 'red',
          borderRadius: '20px',
          width: '170px',
          height: '50px',
          whiteSpace: 'nowrap',
            '&:hover': { backgroundColor: 'red', color: 'black'}
          }}
        variant="contained"
        className={'signInButton'}
            onClick={handleOnClickGuest}
            id="guestButton"
          >
            <p className="sign-in-text">sign in as guest</p></Button>
        </Form>
      </Box>
      {/* Take values from the User input event and set them  
       to the state */}
      <Form id="bottomForm">
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
        {/* On the event of a user click take the values from the state
          and make an API call to server to check if the user exists and if so
          create a JWT Token and set the user's information to the store
          and local storage to give them access to the chat and display
          their belt color in the CSS selectors*/}
        <Button
        sx={{
          color: 'white',
          backgroundColor: 'black',
          border: 3,
          borderColor: 'red',
          borderRadius: '20px',
            '&:hover': { backgroundColor: 'red', color: 'black'}
          }}
        variant="contained"
        className={'signInButton'}
          onClick={handleOnClickUser}

        >
          <p className="sign-in-text">SIGN IN</p></Button>
      </Form>
    </Box>
  );
}

export default Signin