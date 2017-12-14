// @flow
import React, {Component} from 'react';

import type {Allergen, FoodGroup, Meal} from '../../models';
import meals from '../../mock-data/meals';
import mealPrices from '../../mock-data/mealPrices';
import ribbons from '../../mock-data/ribbons.json';
// import FBMenuFilter from './FBMenuFilter';
// import FBMenuSection from './FBMenuSection';
// import FBMenuCart from './FBMenuCart';
import FBMealCard from './FBMealCard';

type Props = {
  allergens: Array<Allergen>,
  isOrderable: boolean,
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
          isOrderable={true}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={10}
          ribbon={ribbons[1]}
        />
        <FBMealCard
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={9}
          ribbon={ribbons[2]}
        />
        <FBMealCard
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          ribbon={ribbons[1]}
        />
        <FBMealCard
          ribbon={ribbons[0]}
          meal={meals[0]}
          mealPrice={mealPrices[0]}
          count={800}
        />
      </div>
    );
  }
}

export default FBMenu;
