// @flow
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Landing from './Landing';

const App = () => (
  <BrowserRouter>
    <Route exact path='/' component={Landing} />
  </BrowserRouter>
);

export default App;
