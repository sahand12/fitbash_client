// @flow
import React, {Component} from 'react';
import pick from 'lodash.pick';

import type {Meal, MealPrice} from '../../models';
import FBMealCardRegular from './FBMealCardRegular';
import FBMealCardCompact from './FBMealCardCompact';

type Props = {
  isCompact: boolean,
  isOrderable: boolean,
  meal: Meal,
  mealPrice: MealPrice,
  count: number,
  minOrder: number,
  maxOrder: number,
  onIncrement: Function,
  onDecrement: Function,
  onClick: Function,
  onClose: Function,
};
function FBMealCard (props: Props) {
  const {
    isOrderable,
    meal,
    mealPrice,
    count,
    minOrder,
    maxOrder,
    onIncrement,
    onDecrement,
    onClick,
  } = props
  return (props.isCompact
    ? <FBMealCardCompact 
        {...pick(props, ['meal', 'mealPrice', 'count', 'minOrder','isOrderable', 'maxOrder', 'onIncrement', 'onDecrement', 'onClose'])}
      />
    : <FBMealCardRegular
        {...pick(props, ['meal', 'mealPrice', 'count', 'minOrder', 'maxOrder', 'onIncrement', 'onDecrement', 'onClick'])}
      />
  );
}

FBMealCard.defaultProps = {
  isCompact: false,
  isOrderable: false,
  count: 0,
  minOrder: 0,
  maxOrder: 100,
  onIncrement() {},
  onDecrement() {},
  onClick() {}
};

export default FBMealCard;
