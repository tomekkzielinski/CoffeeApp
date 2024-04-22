import React from 'react'
import LoginForm from './LoginForm';

const Login = ({handleLogin}) => {

  return (
<div>
    <LoginForm onLogin={handleLogin}/>
</div>
  )
}

export default Login;