// @flow
import React, {Component} from 'react';
import pick from 'lodash.pick';

import type {Meal, MealPrice, Ribbon} from '../../../models';
import FBMealCardRegular from './FBMealCardRegular';
import FBMealCardCompact from './FBMealCardCompact';

export type FBMealCardProps = {
  isCompact: boolean,
  isOrderable: boolean,
  meal: Meal,
  ribbon: Ribbon | null,
  mealPrice: MealPrice,
  count: number,
  minOrder: number,
  maxOrder: number,
  onIncrement: Function,
  onDecrement: Function,
  onClick: Function,
};
function FBMealCard (props: FBMealCardProps) {
  return (props.isCompact
    ? <FBMealCardCompact 
        {...pick(props, ['meal', 'mealPrice', 'count', 'minOrder', 'maxOrder', 'onIncrement', 'onDecrement'])}
      />
    : <FBMealCardRegular
        {...pick(props, ['isOrderable', 'meal', 'mealPrice', 'count', 'ribbon', 'minOrder', 'maxOrder', 'onIncrement', 'onDecrement', 'onClick'])}
      />
  );
}

FBMealCard.defaultProps = {
  isCompact: false,
  isOrderable: false,
  count: 0,
  minOrder: 0,
  maxOrder: 100,
  ribbon: null,
  onIncrement() {},
  onDecrement() {},
  onClick() {},
  onClose() {}
};

export default FBMealCard;
