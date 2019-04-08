import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://penguin.linux.test:2000/api';

axios.interceptors.request.use(requestConfig => {
  requestConfig.headers.authorization = localStorage.getItem('token');
  return requestConfig;
});

export default Component =>
  class extends React.Component {
    render() {
      if (localStorage.getItem('token')) {
        return <Component {...this.props} />;
      } else {
        setTimeout(() => this.props.history.push('/register'), 3000);
        return <h3>You must be logged in to see the users.</h3>;
      }
    }
  };
