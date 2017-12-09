// @flow
import React, {Component} from 'react';

import type {Meal, MealPrice} from '../../models';
import t from '../../i18n';

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
class FBMealCardCompact extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {onIncrement, count, onDecrement, meal, onClose,} = this.props;
    return (
      <div className='fbMealCardCompact'>
        <div className='fbMealCardCompact--counter'>
          <button 
            className='fbMealCardCompact--counter--plus' 
            onClick={onIncrement}
          >
            <span>+</span>
          </button>
          <span className='fbMealCardCompact--counter--text'>{count}</span>
          <button 
            className='fbMealCardCompact--counter--minus'
            onClick={onDecrement}
          >
            <span>-</span>
          </button>
        </div>
        <div className='fbMealCardCompact--image'>
          <img src={meal.mealImageUrls.thumb} />
        </div>
        <div className='fbMealCardCompact--main'>
          <p className='fbMealCardCompact--main--name'>
            {meal.t.fa.name}
          </p>
          <p className='fbMealCardCompact--main--subName'>
            {`${t('common.with')} ${meal.t.fa.sideDishName}`}
          </p>
        </div>
        <div className='fbMealCardCompact--close'>
          <button 
            className='fbMealCarCompat--close--btn'
            onClick={onClose}
          >X</button>
        </div>
      </div>
    );
  }
}

export default FBMealCardCompact;
