// @flow
import React, {Component, type Element} from 'react';

import type {Meal, MealPrice} from "../../models/index";
import meals from '../../mock-data/meals.json';
import mealPrices from '../../mock-data/mealPrices.json';
import FBMealDetailsTabs from './FBMealDetailsTabs';

const country = 'iran';
const locale = 'fa';

type Props = {
  meal: Meal,
  mealPrice: MealPrice,
  isOrderable: boolean,
}
class FBMealDetails extends Component<Props> {
  renderBadges: () => Element<'div'>;
  renderImage: () => Element<'div'>;
  renderOptions: () => Element<'div'>;
  renderTabs: () => Element<'div'>;
  renderTitle: () => Element<'div'>;

  static defaultProps = {
    meal: meals[0],
    mealPrice: mealPrices[0],
    isOrderable: false
  };

  constructor(props: Props) {
    super(props);

    this.renderBadges = this.renderBadges.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  renderBadges(): Element<'div'> {
    return (
      <div className="fbMealDetails--badgesWrapper">badges</div>
    );
  }
  renderImage(): Element<'div'> {
    const {meal} = this.props;
    return (
      <div className="fbMealDetails--image">
        <img
          src={meal.mealImageUrls.large}
          alt={meal.t[locale].name}
          title={meal.t[locale].name}
        />
      </div>
    );
  }
  renderOptions(): Element<'div'> {
    return (
      <div className="fbMealDetails--">image</div>
    );
  }
  renderTabs(): Element<'div'> {
    return (
      <div className="fbMealDetails--tabs">
        <FBMealDetailsTabs meal={this.props.meal}/>
      </div>
    );
  }
  renderTitle(): Element<'div'> {
    const {meal} = this.props;
    return (
      <div className="fbMealDetails--titleWrapper">
        <h1 className="fbMealDetails--title">{meal.t[locale].name}</h1>
      </div>
    );
  }

  render(): Element<*> {
    return (
      <div className="fbMealDetails">
        <section className="fbMealDetails--imageContainer">
          {this.renderImage()}
        </section>
        <section className="fbMealDetails--contentContainer">
          <section className="fbMealDetails--contentHeading">
            {this.renderTitle()}
            {this.renderBadges()}
          </section>
          <section className="fbMealDetails--contentBody">
            {this.renderTabs()}
          </section>
        </section>
      </div>
    );
  }
}

export default FBMealDetails;
