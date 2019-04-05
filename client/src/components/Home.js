import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const token = localStorage.getItem('token');

  return (
    <main>
      <h1>Welcome...</h1>
      <p>Web authentication is tricksy business, but I'm sure we can handle it.</p>
      {!token && (
        <p>Before we can view the users, you'll want to <Link to="/register">sign in</Link> to your account.</p>
      )}
    </main>
  );
};

export default Home;
