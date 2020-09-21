import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, Button, FormField } from 'grommet';
import { useParams, useHistory} from 'react-router-dom'
import SignInButton from './SignInButton'
import { signIn } from '../../store/auth'
import ErrorBox from '../../Grommet/ErrorBox'


const Signin = (props) => {
  const { toggleLast } = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signIn(username, password))
    return history.push(`/`);
  }

  const handleGuestSubmit = async (e) => {
    e.preventDefault()
    dispatch(signIn("Demo", "password"))
    return history.push(`/`);
  }
  return (
    <Box align="center" pad="large">
      <div>
        don't have an account? <SignInButton label="sign up here!" onClickProp={toggleLast} />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Box margin="small">
        <Form onSubmit={handleGuestSubmit}>
          <Button
            type="submit"
            plain={false}
            primary
            color="#ED2D23">
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
          color="#ED2D23">
          sign in</Button>
      </Form>

    </Box>
  );
}

export default Signin