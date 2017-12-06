// @flow
import React from 'react';

import type {Meal, MealPrice} from '../../models';

type Props = {
  meal: Meal,
  mealPrice: MealPrice,
  count: number,
  minOrder: number,
  maxOrder: number,
  onIncrement: Function,
  onDecrement: Function,
  onClose: Function,
}
function FBMealCardCompact(props: Props) {
  
  return (
    <div className='fbMealCardCompact'>
      <div className='fbMealCardCompact--counter'>
        <button 
          className='fbMealCardCompact--counter--plus' 
          onClick={props.onIncrement}
        >
          <span>+</span>
        </button>
        <span className='fbMealCardCompact--counter--text'>{props.count}</span>
        <button 
          className='fbMealCardCompact--counter--minus'
          onClick={props.onDecrement}
        >
          <span>-</span>
        </button>
      </div>
      <div className='fbMealCardCompact--image'></div>
      <div className='fbMealCardCompact--main'>
        <span className='fbMealCardCompact--main--name'>{props.meal.name}</span>
        <span className='fbMealCardCompact--main--subName'>{props.meal.sideDishName}</span>
      </div>
      <div className='fbMealCardCompact--close'>
        <button 
          className='fbMealCarCompat--close--btn'
          onClick={props.onClose}
        >X</button>
      </div>
    </div>
  );
}

export default FBMealCardCompact;
