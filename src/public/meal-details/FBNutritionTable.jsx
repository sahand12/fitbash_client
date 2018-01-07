// @flow
import React, {Component, type Node} from 'react';

import t, {tNum} from '../../i18n';
import {colors} from '../../styles';
const local = 'fa';
const country = 'iran';

const t1 = 'mealDetails.nutrition';

function Row ({children, className = '', style = {}}) {
  return (
    <div className={`fbRow ${className}`} style={style}>
      {children}
    </div>
  );
}
function Cell({children, className = '', style = {}}) {
  return (
    <div className={`fbCell ${className}`} style={style}>
      {children}
    </div>
  );
}
class FBNutritionTable extends Component<
  {nutritionFacts: mixed}
> {
  
  renderHeading = () => {
    const {calories, carbohydrates, protein} = this.props.nutritionFacts;
    return (
      <div className="fbNutritionTable--heading">
        <div className="fbNutritionTable--heading--item">
          {tNum(protein.valueLabel)} <small>({t('mealDetails.nutrition.gram')})</small>
          <br/>
          <span>{t('mealDetails.nutrition.protein')}</span>
        </div>
        <div className="fbNutritionTable--heading--item">
          {tNum(calories.valueLabel)}
          <br/>
          <span>{t('mealDetails.nutrition.calories')}</span>
        </div>
        <div className="fbNutritionTable--heading--item">
          {tNum(carbohydrates.valueLabel)} <small>({t('mealDetails.nutrition.gram')})</small>
          <br/>
          <span>{t('mealDetails.nutrition.carbs')}</span>
        </div>
      </div>
    );
  };
  renderTable = () => {
    const {
      calories,
      caloriesFromFat,
      calcium,
      carbohydrates,
      cholesterol,
      dietaryFiber,
      iron,
      protein,
      servingSize,
      servingUnit,
      saturatedFat,
      sodium,
      sugars,
      totalFat,
      transFat,
      vitaminA,
      vitaminC
    } = this.props.nutritionFacts;
    return (
      <div className="fbNutritionTable--body">
        <h2 className="fbNutritionTable--body--title">{t(`${t1}.nutritionFacts`)}</h2>
        
        <Row style={{border: 'none'}}>
          <Cell className='fbText-light-m'>
            {t(`${t1}.servingSize`)} <small>({t(`${t1}.gram`)})</small>
          </Cell>
          <Cell className='fbText-normal-m'>
            {tNum(servingSize.valueLabel)}
          </Cell>
        </Row>
        <Row style={{borderBottom: `8px solid ${colors.oxley}`}}>
          <Cell className='fbText-light-m'>
            {t(`${t1}.servingsPerContainer`)} <small>({t(`${t1}.man`)})</small>
          </Cell>
          <Cell className='fbText-normal-m'>
            {tNum(servingUnit.valueLabel)}
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-bold-m'>{t(`${t1}.amountPerSaving`)}</Cell>
        </Row>
        <Row style={{borderBottom: `4px solid ${colors.oxley}`}}>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.calories`)} <small className='fbText-light-m'>{tNum(calories.valueLabel)}</small>
          </Cell>
          <Cell className='fbText-light-m'>
            {t(`${t1}.caloriesFromFat`)} <span>{tNum(caloriesFromFat.valueLabel)}</span>
          </Cell>
        </Row>
        <Row style={{justifyContent: 'flex-end'}}>
          <Cell className='fbText-bold-m'>
            <span>*</span>{t(`${t1}.dailyValue`)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.totalFat`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(totalFat.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(totalFat.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m' style={{paddingRight: '1rem'}}>
            {t(`${t1}.saturatedFat`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(saturatedFat.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(saturatedFat.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m' style={{paddingRight: '1rem'}}>
            {t(`${t1}.transFat`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(transFat.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.cholesterol`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(cholesterol.valueLabel)}${t('mealDetails.nutrition.milligram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(cholesterol.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.sodium`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(sodium.valueLabel)}${t('mealDetails.nutrition.milligram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(sodium.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.totalCarbohydrates`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(carbohydrates.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(carbohydrates.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m' style={{paddingRight: '1.5rem'}}>
            {t(`${t1}.dietaryFiber`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(dietaryFiber.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(dietaryFiber.fdaDailyPercentLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m' style={{paddingRight: '1.5rem'}}>
            {t(`${t1}.sugars`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(sugars.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
        </Row>
        <Row style={{borderBottom: `4px solid ${colors.oxley}`}}>
          <Cell className='fbText-bold-m'>
            {t(`${t1}.protein`)}
            <span className='fbText-light-m'>&nbsp;&nbsp;{`${tNum(protein.valueLabel)}${t('mealDetails.nutrition.gram')}`}</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m'>
            <span>{t(`${t1}.vitaminA`)}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(vitaminA.valueLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m'>
            <span>{t(`${t1}.vitaminC`)}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(vitaminC.valueLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m'>
            <span>{t(`${t1}.calcium`)}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(calcium.valueLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
        <Row>
          <Cell className='fbText-light-m'>
            <span>{t(`${t1}.iron`)}</span>
          </Cell>
          <Cell className='fbText-bold-m'>
            {tNum(iron.valueLabel)} <span className='fbText-light-m'>%</span>
          </Cell>
        </Row>
      </div>
    );
  };
  renderFooter = () => {
    return (
      <p className='fbNutritionTable--footer fbText-normal-s'><span>*</span>{t(`${t1}.footnote`)}</p>
    );
  };
  
  render() {
    return (
      <div className='fbNutritionTable'>
        {this.renderHeading()}
        {this.renderTable()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default FBNutritionTable;
