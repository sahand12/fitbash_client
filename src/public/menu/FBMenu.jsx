// @flow
import React, {Component, type Element} from 'react';

import t from '../../i18n';
import type {Allergen, FoodGroup, Meal, MealType, MealPrice} from '../../models';
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
import FBMealCard, {type FBMealCardProps} from './mealCard/index';
import {colors} from "../../styles";

const locale = 'fa'; // @TODO fetch language automatically
const noop = function noop() {};

function removeByKey(obj: Object, deleteKey: string): Object {
  return Object.keys(obj)
    .filter(key => key !== deleteKey)
    .reduce(
      function reduce(result, currentKey) {
        return result[currentKey] = obj[currentKey]
      },
      {}
    );
}

type CartItem = {
  meal: Meal,
  count: number
};
type Props = {
  allergens: Array<Allergen>,
  isOrderable: boolean,
  foodGroups: Array<FoodGroup>,
  meals: Array<Meal>,
  mealTypes: Array<MealType>,
  mealPrices: Array<MealPrice>,
  orderRules: {
    minCount: number,
    maxCount: number,
  }
};
type State = {
  selectedMeals: Array<CartItem>,
  filteredMeals: Array<Meal>,
  selectedFilters: Array<string>,
  filterListVisible: boolean,
};

class FBMenu extends Component<Props, State> {
  onFilterSelection: (String) => void;
  toggleFilterListVisibility: () => void;
  findMealPrice: (string) => MealPrice;
  findMealCount: (string) => number;
  getAllMealTypes: () => Array<string>;
  isMealFiltered: (Meal) => boolean;
  onAddMealToCart: (Meal) => void;
  onRemoveMealFromCart: (string, boolean) => void;
  onMealCardRegularClick: (string) => void;
  renderMealCard: (Meal, boolean) => Element<FBMealCardProps>;
  
  static defaultProps = {
    isOrderable: true,
    meals,
    mealTypes,
    mealPrices,
    foodGroups,
    orderRules: {
      minCount: 0,
      maxCount: 10, // @TODO fetch these dynamically
    }
  };
  state = {
    selectedFilters: [],
    selectedMeals: [],
    filterListVisible: false,
    filteredMeals: [],
  };
  constructor(props: Props) {
    super(props);
    
    this.onFilterSelection = this.onFilterSelection.bind(this);
    this.toggleFilterListVisibility = this.toggleFilterListVisibility.bind(this);
    this.findMealPrice = this.findMealPrice.bind(this);
    this.findMealCount = this.findMealCount.bind(this);
    this.getAllMealTypes = this.getAllMealTypes.bind(this);
    this.isMealFiltered = this.isMealFiltered.bind(this);
    this.onAddMealToCart = this.onAddMealToCart.bind(this);
    this.onRemoveMealFromCart = this.onRemoveMealFromCart.bind(this);
    this.onMealCardRegularClick = this.onMealCardRegularClick.bind(this);
    this.renderMealCard = this.renderMealCard.bind(this);
  }
  componentDidMount() {
    this.setState({
      filteredMeals: this.props.meals,
    });
  }
  findMealPrice(mealId: string): MealPrice {
    const pricePlaceholder: MealPrice = { // @TODO this is not right. fix it.
      id: "1",
      mealId: "1",
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      priceHash: [{
        country: 'iran',
        currency: 'Toman',
        amount: 23999,
        precision: 0,
      }],
    };
    const price = this.props.mealPrices.find((item: MealPrice) => item.mealId === mealId);
    return price || pricePlaceholder;
  }
  findMealCount(mealId: string): number {
    const mealItem = this.state.selectedMeals.find((item: {meal: Meal, count: number}) => item.meal.id === mealId);
    return (mealItem && mealItem.count) || 0;
  }
  getAllMealTypes(): Array<string> {
    return this.state.filteredMeals.map(meal => meal.typeId);
  }
  isMealFiltered(meal: Meal): boolean {
    const filters = this.state.selectedFilters;
    const mealFoodGroupIds = meal.foodGroups;
    console.log(meal, mealFoodGroupIds);
    
    for (let i = 0; i < mealFoodGroupIds.length; i++) {
      if (filters.includes(mealFoodGroupIds[i])) return true;
    }
    return false;
  }
  onAddMealToCart(meal: Meal): void {
    const alreadyAdded: ?CartItem = this.state.selectedMeals.find((item: CartItem) => item.meal.id === meal.id);
    if (typeof alreadyAdded === 'undefined') { // Add for the first time
      this.setState(prevState => ({
        selectedMeals: [...prevState.selectedMeals, {meal, count: 1}]
      }));
    }
    else { // Increase the count
      this.setState(prevState => ({
        selectedMeals: prevState.selectedMeals.map((item: CartItem) => {
          if (item.meal.id === meal.id) {
            if (item.count >= this.props.orderRules.maxCount) { return item; } // Max count already reached.
            return {meal, count: item.count + 1};
          }
          return item;
        }),
      }));
    }
  }
  onRemoveMealFromCart(mealId: string, clearAll: boolean = false): void {
    const cartItem: ?CartItem = this.state.selectedMeals.find((item: CartItem) => item.meal.id === mealId);
    
    // No such meal is in the cart
    if (!cartItem) return;
    
    // Remove the meal from the cart if clearAll flag is true or if the meal count is less than or equal to 1
    if (clearAll || cartItem.count <= 1) {
      this.setState(prevState => ({
        selectedMeals: prevState.selectedMeals.filter((item: CartItem) => item.meal.id !== mealId),
      }));
    }
    
    // Decrement the meal count in the cart
    else {
      this.setState(prevState => ({
        selectedMeals: prevState.selectedMeals.map((item: CartItem) => {
          if (item.meal.id === mealId) {
            return {meal: item.meal, count: item.count - 1};
          }
          return item;
        }),
      }));
    }
  }
  onMealCardRegularClick() {}
  onFilterSelection(id: string): void {
    function updater() {
      this.setState({filteredMeals: this.props.meals.filter(meal => !this.isMealFiltered(meal))});
    }
    if (this.state.selectedFilters.includes(id)) {
      this.setState(
        prevState => ({selectedFilters: prevState.selectedFilters.filter(item => item !== id)}),
        updater,
      );
    }
    else {
      this.setState(
        prevState => ({selectedFilters: [...prevState.selectedFilters, id]}),
        updater
      );
    }
  }
  toggleFilterListVisibility(): void {
    this.setState(prevState => ({
      filterListVisible: !prevState.filterListVisible,
    }));
  }
  renderMealCard(meal: Meal, isCompact: boolean = false) {
    const props: FBMealCardProps = {
      isCompact,
      isOrderable: this.props.isOrderable,
      meal,
      ribbon: null,
      mealPrice: this.findMealPrice(meal.id),
      count: this.findMealCount(meal.id),
      minOrder: this.props.orderRules.minCount,
      maxOrder: this.props.orderRules.maxCount,
      onIncrement: this.onAddMealToCart,
      onDecrement: this.onRemoveMealFromCart,
      onClick: this.onMealCardRegularClick,
    };
    return (<FBMealCard {...props} key={meal.id}/>);
  }

  render() {
    return (
      <section className="fbMenu">
        <FBSection outerStyle={{borderBottom: `1px solid ${colors.zircon}`}} innerStyle={{paddingTop: '0', paddingBottom: '0'}}>
          <FBMenuNav
            mealTypes={this.props.mealTypes}
            filterListVisible={this.state.filterListVisible}
            selectedFiltersCount={this.state.selectedFilters.length}
            onFilterLinkClick={this.toggleFilterListVisibility}
          />
        </FBSection>
        
        {/* Filters Section */}
        {this.state.filterListVisible &&
          <FBMenuFilter
            groups={this.props.foodGroups}
            selectedFilters={this.state.selectedFilters}
            onFilterSelection={this.onFilterSelection}
          />
        }
        
        {/* Menu Sections */}
        {this.props.mealTypes
          .filter((type: MealType) => this.getAllMealTypes().includes(type.id))
          .map((type: MealType) => (
          <FBMenuSection title={type.t[locale].name} key={type.id}>
            {this.state.filteredMeals
              .filter((meal: Meal) => meal.typeId === type.id)
              .map((meal: Meal) => this.renderMealCard(meal, false))
            }
          </FBMenuSection>
        ))}
        
      </section>
    );
  }
}

export default FBMenu;
