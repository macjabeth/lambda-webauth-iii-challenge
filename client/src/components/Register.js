import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useInput } from '../hooks';
import './Register.css';

const Register = ({ history }) => {
  if (localStorage.getItem('token')) return <Redirect to="/" />;

  const [username, setUsername, updateUsername] = useInput();
  const [password, setPassword, updatePassword] = useInput();
  const [department, setDepartment, updateDepartment] = useInput();
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);

  const formToggle = () => setRegistering(!registering);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const url = 'http://penguin.linux.test:2000/api/auth';
      if (registering) await axios.post(url + '/register', { username, password, department });
      const login = await axios.post(url + '/login', { username, password });
      localStorage.setItem('token', login.data.token);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => setError(null), 3000);
      setUsername(''); setPassword('');
      if (registering) setDepartment('');
    } finally {
      if (localStorage.getItem('token')) {
        history.push('/users');
      }
    }
  };

  return (
    <>
      {error && <h6>{error}</h6>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={updateUsername} />
        <input type="password" placeholder="Password" value={password} onChange={updatePassword} />
        {registering && (
          <input type="text" placeholder="Department" value={department} onChange={updateDepartment} />
        )}
        <div>
          <input type="submit" value="Submit" />
          {registering ? (
            <small>
              Already a member? <span onClick={formToggle}>Sign in</span>
            </small>
          ) : (
            <small>
              Not a member? <span onClick={formToggle}>Sign up</span>
            </small>
          )}
        </div>
      </form>
    </>
  );
};

export default Register;
