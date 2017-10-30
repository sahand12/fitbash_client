// @flow
import React from 'react';

import FBHeader from './FBHeader';
import FBFooter from './FBFooter';
import FA from './i18n/fa';

const Landing = () => (
  <div>
    <FBHeader i18n={FA}/>
    <div className='layout-footer'>
      <FBFooter i18n={FA}/>
    </div>
  </div>
);

export default Landing;
