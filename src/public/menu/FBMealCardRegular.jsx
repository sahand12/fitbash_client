// @flow
import React from 'react';

import t, {tNum, formatFANumbers} from "../../i18n/index";
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
  const {count, meal, mealPrice: {priceHash: {amount}}, onIncrement, onDecrement, onClick} = props;
  return (
    <div className='fbMealCardRegular'>
      <div className='fbMealCardRegular--imgWrapper'>
        <img src={meal.mealImageUrls.square} alt={meal.t.fa.name}/>
      </div>
      <div className='fbMealCardRegular--price'>
        {`${formatFANumbers(tNum(amount))} ${t('common.toman')}`}
      </div>
      {props.isOrderable && 
        <div className='fbMealCardRegular--counter'>
          <button
            className='fbMealCardRegular--counter--btn fbBtn fbBtn-lightGreen'
            onClick={onIncrement}
          >
            <span className='icon-plus'/>
          </button>
          <span className='fbMealCardRegular--counter--text'>{count}</span>
          <button 
            className='fbMealCardRegular--counter--btn fbBtn fbBtn-gray'
            onClick={props.onDecrement}
          >
            <span className='icon-minus'/>
          </button>
        </div>
      }
      <div className='fbMealCardRegular--main'>
        <p className='fbMealCardRegular--main--name'>{meal.t.fa.name}</p>
        <p className='fbMealCardRegular--main--subName'>{meal.t.fa.sideDishName}</p>
        <ul className='fbMealCardRegular--main--badges'></ul>
      </div>
    </div>
  );
}

export default FBMealCardRegular;
