// @flow
import React, {Component} from 'react';

import type {Meal, MealPrice} from '../../models';
import t, {tNum, formatFANumbers} from '../../i18n';

// @TODO: fetch currency dynamically
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
  calcPrice: () => number;
  constructor(props: Props) {
    super(props);
    this.calcPrice = this.calcPrice.bind(this);
  }

  calcPrice() {
    return this.props.count * this.props.mealPrice.priceHash.amount;
  }

  render() {
    const {onIncrement, count, onDecrement, meal, onClose} = this.props;
    return (
      <div className='fbMealCardCompact'>
        <div className='fbMealCardCompact--counter'>
          <button 
            className='fbMealCardCompact--counter--btn fbBtn fbBtn-lightGreen'
            onClick={onIncrement}
          >
            <span className="icon-plus"/>
          </button>
          <span className='fbMealCardCompact--counter--text'>{tNum(count)}</span>
          <button 
            className='fbMealCardCompact--counter--btn fbBtn fbBtn-gray'
            onClick={onDecrement}
          >
            <span className="icon-minus"/>
          </button>
        </div>
        <div className='fbMealCardCompact--imgWrapper'>
          <img src={meal.mealImageUrls.thumb} />
        </div>
        <div className='fbMealCardCompact--main'>
          <p className='fbMealCardCompact--main--name'>
            {meal.t.fa.name}
          </p>
          <p className='fbMealCardCompact--main--subName'>
            {`${t('common.with')} ${meal.t.fa.sideDishName}`}
          </p>
          <p className="fbMealCardCompact--main--price">
            {formatFANumbers(tNum(this.calcPrice()), ',')} {t('common.toman')}
          </p>
        </div>
        <div className='fbMealCardCompact--close'>
          <button 
            className='fbMealCardCompact--close--btn fbBtn fbBtn-gray'
            onClick={onClose}
          >
            <span className="icon-cross"/>
          </button>
        </div>
      </div>
    );
  }
}

export default FBMealCardCompact;
