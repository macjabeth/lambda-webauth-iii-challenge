import React from "react";
import { withRouter, NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ history }) => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <header>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      {token && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
};

export default withRouter(Navigation);
