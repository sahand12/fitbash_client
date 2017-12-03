// @flow
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './Landing';
import FBMenuPage from './public/menu-page/FBMenuPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route exact path='/menu' component={FBMenuPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
