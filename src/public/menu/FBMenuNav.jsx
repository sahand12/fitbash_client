// @flow
import React from 'react';
import {Link} from 'react-router-dom';

import type {MealType} from '../../models';
import FBMenuFilterLink from './FBMenuFilterLink';

const locale = 'fa'; // @TODO fetch locale dynamically

type Props = {
  mealTypes: Array<MealType>,
  filterListVisible: boolean,
  selectedFiltersCount: number,
  onFilterLinkClick: Function,
};
const FBMenuNav = function FBMenuNav(props: Props) {
  return (
    <section className='fbMenuNav'>
      <ul className={`fbMenuNav--list${props.filterListVisible ? ' fbHidden' : ''}`}>
        {props.mealTypes.map(type => (
          <li className='fbMenuNav--list--item' key={type.id}>
            <Link
              className='fbLink'
              href={`${type.name}Meals`}
              to={`${type.name}Meals`}
            >
              {type.t[locale].name}
            </Link>
          </li>
        ))}
      </ul>
      <FBMenuFilterLink
        filterListVisible={props.filterListVisible}
        count={props.selectedFiltersCount || 10}
        onClick={props.onFilterLinkClick}
      />
    </section>
  );
};

export default FBMenuNav;
