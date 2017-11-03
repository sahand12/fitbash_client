// @flow
import React from 'react';

import FBHeader from './FBHeader';
import FBFooter from './FBFooter';
import FA from './i18n/fa';

const Landing = () => (
  <div className='layout-container'>
    <FBHeader i18n={FA}/>
    <FBFooter i18n={FA}/>
  </div>
);

export default Landing;
