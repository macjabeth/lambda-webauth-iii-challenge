import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Navigation from './Navigation';
import Home from './Home';
import Register from './Register';
import Users from './Users';

const Root = () => {
  return (
    <Fragment>
      <Navigation />
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/users" component={Users} />
    </Fragment>
  );
};

export default Root;
