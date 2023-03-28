import React, { useState } from 'react';
import Login from '../components/Login/Login';
import UserService from '../services/LoginService';
import HomePage from './HomePage/HomePage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../App';

function LoginPage() {
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Function used to handle the login process when the user clicks the login button in the Login component. 
  const handleLogin = async (username, password) => {
    try {
      const user = await UserService.loginInUser(username, password);
      localStorage.setItem('user', JSON.stringify(user)); 
      setUser(user);
      navigate('/home-page'); 
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error);
    }
  };
  

  return (
    <>
    <div>
      {user ? (
        <HomePage/>
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {error && <p>{error.message}</p>}
    </div>
    </>
  );
};

export default LoginPage;
