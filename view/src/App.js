import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Sales from './pages/Sales/Sales.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Sales} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
