// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import t, {tNum} from '../../i18n';
import {colors} from '../../styles';
import type {FoodGroup, MealType} from '../../models';
const locale = 'fa';

type Props = {
  groups: Array<FoodGroup>,
  selectedFilters: Array<string>,
  onFilterSelection: Function,
};
const FBMenuFilter = function FBMenuFilter(props: Props) {
  return (
    <section className='fbMenuFilter'>
      <FBMenuFilterBox
        heading={t('menu.filterBox.heading')}
        footer={t('menu.filterBox.footer')}
        boxes={props.groups}
        selectedFilters={props.selectedFilters}
        onSelection={props.onFilterSelection}
      />
    </section>
  );
};

type FBMenuFilterBoxProps = {
  heading: string, 
  footer: string, 
  boxes: Array<FoodGroup>, 
  selectedFilters: Array<string>,
  onSelection: Function,
  classNames: string,
};
const FBMenuFilterBox = function FBMenuFilterBox(props: FBMenuFilterBoxProps) {
  console.log('fbMenuFilterBox', props);
  return (
    <section className='fbMenuFilter--box'>
      <h3 className='fbMenuFilter--box--heading'>
        {props.heading}
      </h3>
      <main className='fbMenuFilter--box--listWrapper'>
        <ul className="fbRow-5-2 fbMenuFilter--box--list">
          {props.boxes.map(item => (
            <li
              key={item.id}
              data-boxid={item.id}
              className={`fbRow-5-2--col fbMenuFilter--box--listItem ${props.selectedFilters.includes(item.id) ? 'fbMenuFilter--box--listItem-isSelected' : ''}`}
              onClick={() => props.onSelection(item.id)}
            >
              <Link href='#' to='#'>
                {props.selectedFilters.includes(item.id) &&
                  <span className='fbMenuFilter--box--listItemIcon'>
                    <span className="icon-blocked"/>
                  </span>
                }
                <span className="fbMenuFilter--box--listItemText">
                  {item.t[locale].name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className='fbMenuFilter--box--footer'>
        {props.footer}
      </footer>
    </section>
  );
};
FBMenuFilterBox.defaultProps = {
  classNames: ''
};

export default FBMenuFilter;
