import React, { useState } from "react";
import { axiosWithAuth } from '../utils/AxiosWithAuth'

const Login = props => {
  const [ inputs, setInputs ] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setInputs({
      ...inputs,
      [ e.target.name ]: e.target.value
    })
  }

  const handleLogin = e => {
    e.preventDefault(
    axiosWithAuth()
    .post('/api/login', inputs)
    .then( res => {
    localStorage.setItem('token', res.data.payload)
    props.history.push('/bubblepage')
    })
    .catch(err => console.log(err))
    )
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleLogin} >
        <h2>Login </h2>
        <label htmlFor='usename'></label>
        <input type='text' id='username' name='username' placeholder='username' onChange={handleChange} value={inputs.username} />
        <label htmlFor='password'></label>
        <input type='text' id='password' name='password' placeholder='password' onChange={handleChange} value={inputs.password} />
        <button >Login</button>
      </form>
    </>
  );
};

export default Login;
