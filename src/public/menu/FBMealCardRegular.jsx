// @flow
import React from 'react';

import type {Meal, MealPrice} from '../../models';

type Props = {
  isOrderable: boolean,
  meal: Meal,
  mealPrice: MealPrice,
  count: number,
  minOrder: number,
  maxOrder: number,
  onIncrement: Function,
  onDecrement: Function,
  onClick: Function,
}
function FBMealCardRegular(props: Props) {
  const {count, meal, mealPrice, onIncrement, onDecrement, onClick} = props;
  
  return (
    <div className='fbMealCardRegular'>
      <div className='fbMealCardRegular--image'></div>
      <div className='fbMealCardRegular--price'></div>
      {props.isOrderable && 
        <div className='fbMealCardRegular--counter'>
          <button
            className='fbMealCardRegular--counter--plus'
            onClick={onIncrement}
          >
            <span>+</span>
          </button>
          <span className='fbMealCardRegular--counter--text'>{count}</span>
          <button 
            className='fbMealCardRegular--counter--minus'
            onClick={props.onDecrement}
          >
            <span>-</span>
          </button>
        </div>
      }
      <div className='fbMealCardRegular--main'>
        <p className='fbMealCardRegular--main--name'>{meal.name}</p>
        <p className='fbMealCardRegular--main--subName'>{meal.sideDishName}</p>
        <ul className='fbMealCardRegular--main--badges'></ul>
      </div>
    </div>
  );
}

export default FBMealCardRegular;
