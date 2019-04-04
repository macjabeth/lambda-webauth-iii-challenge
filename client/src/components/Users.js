import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import authenticate from '../helpers/auth';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users').then(({ data }) => {
      setUsers(data);
    });
  }, users);

  const department = users[0] && users[0].department;

  return (
    <Fragment>
      {department && <h3>{department}</h3>}
      <ul>
        {users.map(user => (
          <li>{user.username}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default authenticate(Users);
