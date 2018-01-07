// @flow
import React, {Component, type Element} from 'react';

import type {Meal, MealPrice} from '../../../models';
import t, {tNum, formatFANumbers} from '../../../i18n';

// @TODO: fetch these dynamically
const locale = 'fa';
const country = 'iran';

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

function sliceString(str: string, length: number): string {
  if (str.length <= length) { return str; }
  const words = str.split(/\s/);
  let currentLength = 0;
  let result = [];
  let index = 0;
  while (index < words.length) {
    currentLength += words[index].length;
    if (currentLength >= length - 4) { break; }
    result.push(words[index]);
    index++;
  }
  return `${result.join(' ')} ...`;
}
class FBMealCardCompact extends Component<Props> {
  calcPrice: () => number;
  onCloseBtnClick: () => void;
  onMinusBtnClick: () => void;
  onPlusBtnClick: () => void;
  
  renderCounter: () => Element<'div'>;
  renderImage: () => Element<'div'>;
  renderName: () => Element<'div'>;
  renderSubName: () => Element<'div'> | null;
  renderPrice: () => Element<'div'>;
  renderCloseButton: () => Element<'div'>;
  
  constructor(props: Props) {
    super(props);
    
    this.onCloseBtnClick = this.onCloseBtnClick.bind(this);
    this.onPlusBtnClick = this.onPlusBtnClick.bind(this);
    this.onMinusBtnClick = this.onMinusBtnClick.bind(this);
    
    this.calcPrice = this.calcPrice.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
    this.renderCloseButton = this.renderCloseButton.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.renderSubName = this.renderSubName.bind(this);
  }
  
  calcPrice(): number {
    console.log(this.props);
    const priceHash = this.props.mealPrice.priceHash.
      find(ph => ph.country === country) || {amount: 0};
    return this.props.count * priceHash.amount;
  }
  
  onCloseBtnClick() {
    this.props.onDecrement(this.props.meal.id, true);
  }
  onPlusBtnClick() {
    this.props.onIncrement(this.props.meal);
  }
  onMinusBtnClick() {
    this.props.onDecrement(this.props.meal.id);
  }
  
  renderCounter(): Element<'div'> {
    const {count, maxOrder} = this.props;
    return (
      <div className='fbMealCardCompact--counter'>
        <button
          className='fbMealCardCompact--counter--btn fbBtn fbBtn-lightGreen'
          onClick={this.onPlusBtnClick}
          disabled={count >= maxOrder}
        >
          <span className="icon-plus"/>
        </button>
        <span className='fbMealCardCompact--counter--text'>{tNum(count)}</span>
        <button
          className='fbMealCardCompact--counter--btn fbBtn fbBtn-gray'
          onClick={this.onMinusBtnClick}
        >
          <span className="icon-minus"/>
        </button>
      </div>
    );
  }
  renderImage(): Element<'div'> {
    const {meal} = this.props;
    return (
      <div className='fbMealCardCompact--imgWrapper' title={meal.t[locale].name}>
        <img src={meal.mealImageUrls.thumb} alt={meal.t[locale].name}/>
      </div>
    );
  }
  renderName(): Element<'p'> {
    const {meal} = this.props;
    return (
      <p className='fbMealCardCompact--main--name' title={meal.t[locale].name}>
        {sliceString(meal.t[locale].name, 20)}
      </p>
    );
  }
  renderSubName(): Element<'p'> | null {
    const {meal} = this.props;
    if (meal.sideDishName === '' || meal.sideDishName == null) return null;
    return (
      <p
        className='fbMealCardCompact--main--subName'
        title={`${t('common.with')} ${meal.t[locale].sideDishName}`}>
        {sliceString(`${t('common.with')} ${meal.t[locale].sideDishName}`, 30)}
      </p>
    );
  }
  renderPrice(): Element<'p'> {
    return (
      <p className="fbMealCardCompact--main--price">
        {formatFANumbers(tNum(this.calcPrice()), ',')} {t('common.toman')}
      </p>
    );
  }
  renderCloseButton(): Element<'div'> {
    return (
      <div className='fbMealCardCompact--close'>
        <button
          className='fbMealCardCompact--close--btn fbBtn fbBtn-gray'
          onClick={this.onCloseBtnClick}
        >
          <span className="icon-cross"/>
        </button>
      </div>
    );
  }
  
  render() {
    return (
      <div className='fbMealCardCompact'>
        {this.renderCounter()}
        {this.renderImage()}
        <div className='fbMealCardCompact--main'>
          {this.renderName()}
          {this.renderSubName()}
          {this.renderPrice()}
        </div>
        {this.renderCloseButton()}
      </div>
    );
  }
}

export default FBMealCardCompact;
