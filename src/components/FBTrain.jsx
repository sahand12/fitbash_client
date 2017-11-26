// @flow
import React, {Component} from 'react';
import type {ComponentType, Node} from 'react';

import t from '../i18n';
import FBMealCard, {type FBMealCardProps} from './FBMealCard';

const items: {component: ComponentType<*>, props: FBMealCardProps}[] = [
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spicy-veggie-pozole.jpg',
      name: t('meals.spicyVeggiePozole.name'),
      description: t('common.vegetarian'),
      mealId: '12345',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/taco-salad.jpg',
      name: t('meals.tacoSalad.name'),
      description: t('common.glutenFree'),
      mealId: '123323',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/pesto-salmon.jpg',
      name: t('meals.pestoSalmon.name'),
      description: t('common.vegetarian'),
      mealId: '123423325',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spicy-braised-beef-chili.jpg',
      name: t('meals.spicyBraisedBeefChili.name'),
      description: t('common.vegetarian'),
      mealId: '123fsdg45',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/weeknight-roasted-chicken.jpg',
      name: t('meals.weeknightRoastedChicken.name'),
      description: t('common.vegetarian'),
      mealId: '122342345',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spiced-chicken-and-rice.jpg',
      name: t('meals.spicedChickenAndRice.name'),
      description: t('common.vegetarian'),
      mealId: '12sdfwew345',
      url: '',
    }
  },
];
class FBTrain extends Component<*> {
  trainWindow: ?HTMLUListElement;
  
  navClick = (event: SyntheticEvent<HTMLAnchorElement>, direction: 'next' | 'prev') => {
    event.preventDefault();
    let wagonWidth;
    
    if (this.trainWindow) {
      wagonWidth = this.trainWindow.children[0].offsetWidth;
    }
    return wagonWidth && direction;
  };
  
  render(): Node {
    return (
      <div className='fbTrain'>
        <div className='fbTrain--navigationWrapper'>
          <a
            className='fbTrain--navigation'
            href='/#'
            onClick={event => this.navClick(event, 'prev')}
          >
            <span className='icon-right'/>
          </a>
        </div>
        <div className="fbTrain--windowWrapper">
          <ul
            ref={(ul) => {this.trainWindow = ul}}
            className='fbTrain--window'
          >
            {items.map(item => {
              const ItemComponent: ComponentType<*> = item.component;
              return (
                <li className='fbTrain--wagon' key={item.props.mealId}>
                  <ItemComponent {...item.props} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='fbTrain--navigationWrapper'>
          <a
            className='fbTrain--navigation'
            href='/#'
            onClick={(event) => this.navClick(event, 'next')}
          >
            <span className='icon-left'/>
          </a>
        </div>
      </div>
    );
  }
}

export default FBTrain;
