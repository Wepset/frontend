import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sales from './pages/Sales/Sales';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Sales} />
    </Switch>
  );
}

export default Routes;