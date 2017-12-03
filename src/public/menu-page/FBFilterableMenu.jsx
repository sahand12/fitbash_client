// @flow
import React from 'react'

import FBMealsMenuFilter from './FBMealsMenuFilter';
import FBMealsMenu from './FBMealsMenu';

const FBFilterableMenu = () => (
  <section className="fbFilterableMenu">
    <FBMealsMenuFilter/>
    <FBMealsMenu/>
  </section>
);

export default FBFilterableMenu;
