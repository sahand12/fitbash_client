// @flow
import React, {Component} from 'react';

import type {Allergen, FoodGroup, Meal} from '../../models';
import meals from '../../mock-data/meals';
import mealPrices from '../../mock-data/mealPrices';
// import FBMenuFilter from './FBMenuFilter';
// import FBMenuSection from './FBMenuSection';
// import FBMenuCart from './FBMenuCart';
import FBMealCard from './FBMealCard';

type Props = {
  allergens: Array<Allergen>,
  canOrder: boolean,
  foodGroups: Array<FoodGroup>,
  meals: Array<Meal>,
  orderRules?: {
    minCount: number,
  }
};
type State = {
  selectedMeals: Array<{id: string, count: number}>,
  selectedAllergens: Array<{id: string}>,
};

class FBMenu extends Component<Props, State> {
  static defaultProps = {
    meals,
  };
  componentWillMount() {
    console.log(this.props.meals);
  }

  render() {
    return (
      <div>
        <FBMealCard
          isCompact={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
        />
        <FBMealCard
          isCompact={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={10}
        />
        <FBMealCard
          isCompact={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={9}
        />
        <FBMealCard
          isCompact={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
        />
        <FBMealCard
          isCompact={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={800}
        />
      </div>
    );
  }
}

export default FBMenu;
