// @flow
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './Landing';
import FBMenuPage from './public/menu-page/FBMenuPage';
import FBMenu from './public/menu/FBMenu';
import FBMealDetails from "./public/meal-details/index";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/menu' component={FBMenuPage} />
      <Route exact path='/choose' component={FBMenu} />
      <Route path='/meals' component={FBMealDetails} />
    </Switch>
  </BrowserRouter>
);

export default App;
