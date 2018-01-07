// @flow
import React from 'react';
import {render} from 'react-dom';

import App from './App';
import '../public/styles/index.scss';

const $app = document.getElementById('app');
const renderApp = function renderApp() {
  // $FlowFixMe
  render(<App />, $app);
};

// Initial render
renderApp();

if (module.hot) {
  module.hot.accept('./App', renderApp);
}
