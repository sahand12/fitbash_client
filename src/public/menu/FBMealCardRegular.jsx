// @flow
import React from 'react';

import t, {tNum, formatFANumbers} from "../../i18n/index";
import type {Meal, MealPrice, Ribbon} from '../../models';

// @TODO: dynamic currency resolution
type Props = {
  isOrderable: boolean,
  meal: Meal,
  mealPrice: MealPrice,
  ribbon: Ribbon,
  count: number,
  minOrder: number,
  maxOrder: number,
  onIncrement: Function,
  onDecrement: Function,
  onClick: Function,
}
function FBMealCardRegular(props: Props) {
  const {count, meal, mealPrice: {priceHash: {amount}}, ribbon, onIncrement, onDecrement, onClick} = props;
  return (
    <div className='fbMealCardRegular'>
      <div className='fbMealCardRegular--imgWrapper'>
        <img src={meal.mealImageUrls.square} alt={meal.t.fa.name}/>
      </div>
      {props.isOrderable &&
        <div className='fbMealCardRegular--counter'>
          <button
            className='fbMealCardRegular--counter--plus fbBtn fbBtn-lightGreen'
            onClick={onIncrement}
          >
            <span className='icon-plus'/>
          </button>
          <span className='fbMealCardRegular--counter--count'>
            {tNum(count)}
          </span>
          <button 
            className='fbMealCardRegular--counter--minus fbBtn fbBtn-gray'
            onClick={props.onDecrement}
          >
            <span className='icon-minus'/>
          </button>
        </div>
      }
      <div className='fbMealCardRegular--price'>
        {`${formatFANumbers(tNum(amount))} ${t('common.toman')}`}
      </div>
      <div className='fbMealCardRegular--main'>
        <p className='fbMealCardRegular--main--name' title={meal.t.fa.name}>{meal.t.fa.name}</p>
        <p className='fbMealCardRegular--main--subName' title={meal.t.fa.sideDishName}>
          {`${t('common.with')} ${meal.t.fa.sideDishName}`}
        </p>
        <ul className='fbMealCardRegular--main--badges'></ul>
      </div>
      {
        ribbon &&
        <div className="fbMealCardRegular--ribbonWrapper">
          <div className="fbMealCardRegular--ribbon">{ribbon.t.fa.label}</div>
        </div>
      }
    </div>
  );
}

export default FBMealCardRegular;
