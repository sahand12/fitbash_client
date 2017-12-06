// @flow
import React, {Component} from 'react';
import type {Allergen, FoodGroup, Meal} from '../../models';

import FBMenuFilter from './FBMenuFilter';
import FBMenuSection from './FBMenuSection';
import FBMenuCart from './FBMenuCart';


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
  
  render() {
    return ();
  }
}

export default FBMenu;