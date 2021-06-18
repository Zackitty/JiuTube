import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, Button, FormField } from 'grommet';
import { useParams, useHistory, Redirect} from 'react-router-dom'
import SignInButton from './SignInButton'
import { signIn } from '../../store/auth'
import ErrorBox from '../../Grommet/ErrorBox'


const Signin = (props) => {
  const { toggleLast } = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors, needSignIn } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  let history = useHistory()
  const USER_ID = localStorage.getItem('USER_ID')
  const userColor = localStorage.getItem('BELT_COLOR')
  
 
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
        don't have an account? <SignInButton id="actualSignIn" label="sign up!" onClickProp={toggleLast}  />
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
            id="guestButton"
           >
            sign in as guest</Button>
        </Form>
      </Box>
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
        <Button
          type="submit"
          plain={false}
          primary
          color="#ED2D23"
          onClick={handleOnClickUser}
          id="actualSignInButton"
          >
          sign in</Button>
      </Form>
    </Box>
  );
}

export default Signin