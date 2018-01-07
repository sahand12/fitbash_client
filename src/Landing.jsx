// @flow
import React from 'react';

import FBHeader from './FBHeader';
import FBFooter from './FBFooter';
import FBHero from './FBHero';
import FBSectionHowItWorks from './FBHowItWorksSection';
import FBSectionOurChefs from './FBOurChefs';
import FBSectionJoinNewsLetter from './FBJoinNewsLetter';
import FBSectionMenuShowCase from './FBSectionMenuShowCase';

const Landing = () => (
  <div className='layout-container'>
    <div className="layout-content">
      <FBHeader/>
      <FBHero/>
      <FBSectionHowItWorks/>
      <FBSectionOurChefs/>
      <FBSectionMenuShowCase/>
      <FBSectionJoinNewsLetter/>
    </div>
    <FBFooter/>
  </div>
);

export default Landing;
