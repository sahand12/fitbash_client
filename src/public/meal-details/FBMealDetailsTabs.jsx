// @flow
import React, {Component} from 'react';

import FBTabs from '../../components/FBTabs/FBTabs';
import FBTabPanels from '../../components/FBTabs/FBTabPanels';
import FBTabPanel from '../../components/FBTabs/FBTabPanel';
import FBTabList from '../../components/FBTabs/FBTabList';
import FBTab from '../../components/FBTabs/FBTab';
import type {Meal} from '../../models/index';
import t from '../../i18n';

const locale = 'fa';
const titles = ['details', 'ingredients', 'nutrition'];

class FBMealDetailsTabs extends Component<
  {meal: Meal}
> {
  
  renderDescription = () => {
    return this.props.meal.t[locale].description;
  };

  renderIngredients = () => {
    return this.props.meal.t[locale].ingredients;
  };

  renderNutritionTable = () => {
    return (
      <code><pre>
        {JSON.stringify(this.props.meal.nutritionWithDailyValues, null, 2)}
      </pre></code>
    );
  };
  
  render() {
    return (
      <FBTabs className='fbMealDetailsTabs'>
        <FBTabList className='fbMealDetailsTabs--tabList'>
          {titles.map(title => (
            <FBTab
              key={title}
              activeClassName='fbMealDetailsTabs--tab-isActive'
              className='fbMealDetailsTabs--tab'
            >
              <div className='fbMealDetailsTabs--tab--text'>
                {t(`mealDetails.tabs.${title}`)}
              </div>
              <div className='fbMealDetailsTabs--tab--box'/>
            </FBTab>
          ))}
        </FBTabList>
        <FBTabPanels className='fbMealDetailsTabs--tabPanels'>
          <FBTabPanel>{this.renderDescription()}</FBTabPanel>
          <FBTabPanel>{this.renderIngredients()}</FBTabPanel>
          <FBTabPanel>{this.renderNutritionTable()}</FBTabPanel>
        </FBTabPanels>
      </FBTabs>
    );
  }
}

export default FBMealDetailsTabs;
