import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Box, Form, Button, FormField } from 'grommet';

import SignInButton from './SignInButton'
import ErrorBox from '../../Grommet/ErrorBox'
import { signUp } from '../../store/auth'


const SignUp = (props) => {
  const [username, setUserName] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [beltcolor, setBeltColor] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [mediaurl, setMediaUrl] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(username, fullname, email, beltcolor,
  affiliation, password, mediaurl))
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
          name="user_name"
          label="User Name"
          type="text"
          value={username}
          onChange={e => setUserName(e.target.value)} />
        <FormField
          name="full_name"
          label="Full Name"
          type="text"
          value={fullname}
          onChange={e => setFullName(e.target.value)} />
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
        <Select
          name="belt_color"
          label="Belt Color"
          options={['White/Branca', 'Blue/Azul', 'Purple/Roxa', "Brown/Marrom", "Black/Preto"]}
          value={beltcolor}
          onChange={({ option }) => setBeltColor(option)} />
        <FormField
          name="affiliation"
          label="Affiliation"
          type="text"
          value={affiliation}
          onChange={e => setAffiliation(e.target.value)} />
        <FormField
          name="media_url"
          label="Avatar"
          type="file"
          value={mediaurl}
          onChange={e => setMediaUrl(e.target.value)} />
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

export default SignUp