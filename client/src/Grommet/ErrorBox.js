import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from 'grommet'

const ErrorBox = () => {
  const { authErrors } = useSelector(state => state.currentUser)
  return (
    <Box align="start" pad="xsmall" border={{ color: "#ED2D23" }} round="xsmall" fill="horizontal" background="#ffe0e1">
      <Text size="small">Please Adjust The Following:</Text>
      {authErrors.map(err => <Text size="small">{err}</Text>)}
    </Box>
  )
}

export default ErrorBox