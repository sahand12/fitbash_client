// @flow
import React from 'react';

import FBHeader from '../../FBHeader';
import FBFooter from '../../FBFooter';
import FBMenuPageHeader from './FBMenuPageHeader';
import FBFilterableMenu from './FBFilterableMenu';

const FBMenuPage = () => (
  <div className='layout-container'>
    <div className="layout-content">
      <FBHeader/>
      <FBMenuPageHeader />
      <FBFilterableMenu/>
    </div>
    <FBFooter/>
  </div>
);

export default FBMenuPage;
