import React, { useState } from 'react';
import "./Login.scss"

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function used to call the onLogin function with the username and password as arguments that are entered by the user.

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input className='login-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input className='login-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button className='login-btn' type="submit">Login</button>
    </form>
  );
};

export default Login;
