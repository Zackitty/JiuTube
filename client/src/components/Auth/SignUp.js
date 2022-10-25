import React, { useState, useDispatch, useSelector } from 'react';
import { Select, Box, Form, Button, FormField } from 'grommet';
import S3FileUpload from 'react-s3';
import SignInButton from './SignInButton'
import ErrorBox from '../../Grommet/ErrorBox'
import { signUp } from '../../store/auth'
import { useHistory } from 'react-router-dom'

const SignUp = (props) => {
  const [username, setUserName] = useState('')
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('');
  const [belt_color, setBelt_Color] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [mediaurl, setMediaUrl] = useState('');
  const [password, setPassword] = useState('');
  const { authErrors } = useSelector(state => state.currentUser)
  const dispatch = useDispatch();
  let history = useHistory()
  const handleFileUpload = async (e) => {
    // Configures AWS Cloud Technology to allow users to store pictures
    const config = {
      bucketName: 'jiutubeawsbucket',
      region: 'us-east-2',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
    //  take the file  from the event of a user uploading a file and
    // uploads it to the AWS cloud bucket and sets the URL to the state
    // so that it can be sent to the server and stored in the sql database
    // to be displayed when the user chats
    const file = e.target.files[0]
    S3FileUpload.uploadFile(file, config)
      .then(data => setMediaUrl(data.location))
      .catch(err => console.error(err))
  }
  // Dispatches Signup function from the Redux Store 
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(username, fullname, email, belt_color,
      affiliation, password, mediaurl))
    localStorage.setItem("UPDATE_NAV", "UPDATE")
    return history.push(`/`);
  }
  // Destructured from props
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
          options={['White', 'Blue', 'Purple', "Brown", "Black"]}
          value={belt_color}
          onChange={({ option }) => setBelt_Color(option)} />
        <FormField
          name="affiliation"
          label="Affiliation"
          type="text"
          value={affiliation}
          onChange={e => setAffiliation(e.target.value)} />
        <FormField
          name="avatar"
          label="Avatar"
          type="file"
          onChange={handleFileUpload} />
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