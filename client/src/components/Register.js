import React, { useState } from 'react';
import axios from 'axios';
import { useInput } from '../hooks';
import './Register.css';

const Register = ({ history }) => {
  const [username, setUsername, updateUsername] = useInput();
  const [password, setPassword, updatePassword] = useInput();
  const [department, setDepartment, updateDepartment] = useInput();
  const [registering, setRegistering] = useState(false);

  const formToggle = () => setRegistering(!registering);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const url = `http://penguin.linux.test:2000/api/auth/${registering ? 'register' : 'login'}`
      const creds = { username, password, department: registering ? department : null }
      const response = await axios.post(url, creds);
      localStorage.setItem('token', response.data.token);
      setRegistering(false); history.push('/users');
    } catch (error) {
      console.error(error);
    }

    setUsername(''); setPassword(''); if (registering) setDepartment('');
  };

  return (
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
  );
};

export default Register;
