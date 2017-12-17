// @flow
import React, {Component} from 'react';

import t from '../../i18n';
import type {Allergen, FoodGroup, Meal} from '../../models';
import meals from '../../mock-data/meals';
import foodGroups from '../../mock-data/foodGroups.json';
import mealTypes from '../../mock-data/mealTypes.json';
import mealPrices from '../../mock-data/mealPrices';
import ribbons from '../../mock-data/ribbons.json';
import FBSection from '../../components/FBSection';
import FBMenuFilter from './FBMenuFilter';
import FBMenuSection from './FBMenuSection';
import FBMenuNav from './FBMenuNav';
// import FBMenuCart from './FBMenuCart';
import FBMealCard from './mealCard';

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
  selectedMeals: Array<{meal: Meal, count: number}>,
  selectedFilters: Array<string>,
  filterListVisible: boolean,
};

class FBMenu extends Component<Props, State> {
  onFilterSelection: Function;
  toggleFilterListVisibility: Function;
  static defaultProps = {
    meals,
  };
  state = {
    selectedFilters: [],
    selectedMeals: [],
    filterListVisible: false,
  };
  constructor(props: Props) {
    super(props);
    
    this.onFilterSelection = this.onFilterSelection.bind(this);
    this.toggleFilterListVisibility = this.toggleFilterListVisibility.bind(this);
  }
  onFilterSelection(id: string) {
    if (this.state.selectedFilters.includes(id)) {
      this.setState(prevState => ({
        selectedFilters: prevState.selectedFilters.filter(item => item !== id),
      }));
    }
    else {
      this.setState(prevState => ({
        selectedFilters: [...prevState.selectedFilters, id],
      }));
    }
  }
  toggleFilterListVisibility() {
    this.setState(prevState => ({
      filterListVisible: !prevState.filterListVisible,
    }));
  }

  render() {
    return (
      <FBSection>
        <section className="fbMenu">
          <FBMenuNav
            mealTypes={mealTypes}
            filterListVisible={this.state.filterListVisible}
            selectedFiltersCount={this.state.selectedFilters.length}
            onFilterLinkClick={this.toggleFilterListVisibility}
          />
          {this.state.filterListVisible &&
            <FBMenuFilter
              groups={foodGroups}
              selectedFilters={[]}
              onFilterSelection={this.onFilterSelection}
            />
          }
        </section>
      </FBSection>
    );
  }
}

export default FBMenu;
