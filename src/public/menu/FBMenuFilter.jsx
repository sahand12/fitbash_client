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
      <div className='fbMenuFilter--filterBox'>
        <FBMenuFilterBox
          heading={t('menu.filterBox.heading')}
          footer={t('menu.filterBox.footer')}
          boxes={props.groups}
          selectedFilters={props.selectedFilters}
          onSelection={props.onFilterSelection}
        />
      </div>
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
  return (
    <section className='fbMenuFilterBox'>
      <h3 className='fbMenuFilterBox--heading'>
        {props.heading}
      </h3>
      <main className='fbMenuFilterBox--main'>
        <ul className="fbRow-5-2 fbMenuFilterBox--boxesContainer">
          {props.boxes.map(item => (
            <li
              key={item.id}
              data-boxid={item.id}
              className="fbRow-5-2--col fbMenuFilterBox--box"
              onClick={props.onSelection}
            >
              {props.selectedFilters.includes(item.id) &&
                <span className='fbMenuFilterBox--icon'>
                  <span className="icon-blocked"/>
                </span>
              }
              <span
                className={`fbMenuFilterBox--text${props.selectedFilters.includes(item.id) ? ' fbMenuFilterBox--box-selected' : ''}`}
              >
                {item.t[locale].name}
              </span>
            </li>
          ))}
        </ul>
      </main>
      <footer className='fbMenuFilterBox--footer'>{props.footer}</footer>
    </section>
  );
};
FBMenuFilterBox.defaultProps = {
  classNames: ''
};

export default FBMenuFilter;
