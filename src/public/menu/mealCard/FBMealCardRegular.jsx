// @flow
import React, {Component, type Element} from 'react';

// @TODO: make currency & translation dynamic
const locale = 'fa';
const country = 'iran';

import t, {tNum, formatFANumbers} from '../../../i18n/index';
import type {Meal, MealPrice, Ribbon} from '../../../models';

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

class FBMealCardRegular extends Component<Props> {
  onMinusBtnClick: () => void;
  onPlusBtnClick: () => void;
  
  renderCounter: () => Element<'div'>;
  renderImage: () => Element<'div'>;
  renderPrice: () => Element<'div'>;
  renderName: () => Element<'p'>;
  renderSubName: () => Element<'p'>;
  renderRibbon: () => Element<'div'>;
  
  constructor(props: Props) {
    super(props);
    
    this.renderCounter = this.renderCounter.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderPrice = this.renderPrice.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderRibbon = this.renderRibbon.bind(this);
    this.renderSubName = this.renderSubName.bind(this);
    
    this.onMinusBtnClick = this.onMinusBtnClick.bind(this);
    this.onPlusBtnClick = this.onPlusBtnClick.bind(this);
  }
  
  onMinusBtnClick() {
    this.props.onDecrement(this.props.meal.id);
  }
  onPlusBtnClick() {
    this.props.onIncrement(this.props.meal);
  }
  
  renderBadges(): Element<'ul'> {
    return (
      <ul className='fbMealCardRegular--main--badges'></ul>
    );
  }
  renderCounter(): Element<'div'> {
    const {count, maxOrder} = this.props;
    return (
      <div className='fbMealCardRegular--counter'>
        <button
          className={`fbMealCardRegular--counter--btn fbMealCardRegular--counter--plus fbBtn fbBtn-lightGreen ${
            count >= maxOrder ? 'fbMealCardRegular--counter--plus-isDisabled' : ''
          }`}
          disabled={count >= maxOrder}
          onClick={this.onPlusBtnClick}
        >
          <span className='icon-plus'/>
        </button>
        <span
          className={`fbMealCardRegular--counter--count ${count > 0 ? 'fbMealCardRegular--counter--count-isActive' : ''}`}
        >
          {tNum(count)}
        </span>
        <button
          className={`fbMealCardRegular--counter--btn fbMealCardRegular--counter--minus fbBtn fbBtn-gray ${
            count > 0 ? 'fbMealCardRegular--counter--minus-isActive' : ''
          }`}
          disabled={count <= 0}
          onClick={this.onMinusBtnClick}
        >
          <span className='icon-minus'/>
        </button>
      </div>
    );
  }
  renderImage(): Element<'div'> {
    const {meal} = this.props;
    return (
      <div className='fbMealCardRegular--imgWrapper'>
        <img src={meal.mealImageUrls.square} alt={meal.t[locale].name}/>
      </div>
    );
  }
  renderPrice(): Element<'div'> {
    const priceHash = this.props.mealPrice.priceHash
      .find(ph => ph.country === country) || {amount: 0}; // @TODO fix this
    return (
      <div className='fbMealCardRegular--price'>
        {`${formatFANumbers(tNum(priceHash.amount))} ${t('common.toman')}`}
      </div>
    );
  }
  renderName(): Element<'p'> {
    const {meal} = this.props;
    return (
      <p
        className='fbMealCardRegular--main--name'
        title={meal.t[locale].name}
      >
        {meal.t.fa.name}
      </p>
    );
  }
  renderSubName() {
    const {meal} = this.props;
    if (meal.sideDishName === '' || meal.sideDishName == null) { return null; }
    return (
      <p className='fbMealCardRegular--main--subName' title={meal.t.fa.sideDishName}>
        {`${t('common.with')} ${meal.t.fa.sideDishName}`}
      </p>
    );
  }
  renderRibbon(): Element<'div'> {
    const {ribbon} = this.props
    return (
      <div className="fbMealCardRegular--ribbonWrapper">
        <div className="fbMealCardRegular--ribbon">{ribbon.t.fa.label}</div>
      </div>
    );
  }
  
  render() {
    const {isOrderable,ribbon} = this.props;
    return (
      <div className='fbMealCardRegular'>
        
        {this.renderImage()}
        {isOrderable && this.renderCounter()}
        {this.renderPrice()}
        
        <div className='fbMealCardRegular--main'>
          {this.renderName()}
          {this.renderSubName()}
          {this.renderBadges()}
        </div>
        
        {ribbon && this.renderRibbon()}
      </div>
    );
  }
}

export default FBMealCardRegular;
