import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Form, Button, FormField } from 'grommet';

import SignInButton from './SignInButton'
import ErrorBox from '../Grommet/ErrorBox'
import { signUp } from '../store/auth'


const Signup = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(firstName, lastName, email, password))
  }
  const { toggleLast } = props
  return (

    <Box align="center" pad="large">
      <div>
        Already have an account? <SignInButton label="sign in here!" onClickProp={toggleLast} />
      </div>
      {/* if authErrors, show Error Box */}
      {authErrors && <ErrorBox />}
      <Form
        onSubmit={handleSubmit}>
        <FormField
          name="first_name"
          label="First Name"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)} />
        <FormField
          name="last_name"
          label="Last Name"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)} />
        <FormField
          name="email"
          label="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)} />
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
          sign up</Button>
      </Form>
    </Box>
  );
}

export default Signup