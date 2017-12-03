// @flow
import React from 'react'

import t from '../../i18n';
import {mealTypes, mealFilters} from '../../data.js';
import FBMealsMenuFilter from './FBMealsMenuFilter';
import FBMealsMenu from './FBMealsMenu';


const FBFilterableMenu = () => (
  <section className='fbFilterableMenu'>
    <FBMealsMenuFilter
      types={mealTypes.map(type => ({name: t(`common.${type}`)}))}
      filters={mealFilters.map(name => {t(`common.${name}`)})}
    />
  </section>
);

export default FBFilterableMenu;
