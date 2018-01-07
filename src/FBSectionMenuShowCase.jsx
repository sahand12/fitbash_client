// @flow
import React from 'react';
import {Link} from 'react-router-dom';

import t from './i18n';
import FBSection from './components/FBSection';
import FBCarousel, {type FBCarouselSeatProps} from './components/FBCarousel';
import FBMealCard from './components/FBMealCard';

const items: FBCarouselSeatProps[] = [
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spicy-veggie-pozole.jpg',
      name: t('meals.spicyVeggiePozole.name'),
      description: t('common.vegetarian'),
      id: '12345',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/taco-salad.jpg',
      name: t('meals.tacoSalad.name'),
      description: t('common.glutenFree'),
      id: '123323',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/pesto-salmon.jpg',
      name: t('meals.pestoSalmon.name'),
      description: t('common.vegetarian'),
      id: '123423325',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spicy-braised-beef-chili.jpg',
      name: t('meals.spicyBraisedBeefChili.name'),
      description: t('common.vegetarian'),
      id: '123fsdg45',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/weeknight-roasted-chicken.jpg',
      name: t('meals.weeknightRoastedChicken.name'),
      description: t('common.vegetarian'),
      id: '122342345',
      url: '',
    }
  },
  {
    component: FBMealCard,
    props: {
      imgSrc: 'public/img/plates/spiced-chicken-and-rice.jpg',
      name: t('meals.spicedChickenAndRice.name'),
      description: t('common.vegetarian'),
      id: '12sdfwew345',
      url: '',
    }
  },
];
const fbCarouselProps = {items};

const outerStyle = {
  backgroundColor: '#f7f7f7',
};
const FBSectionMenuShowCase = () => (
  <FBSection outerStyle={outerStyle}>
    <section className="FBSectionMenuShowCase">
      <h1 className="fbSection--heading">{t('home.menuShowcase.heading')}</h1>
      <FBCarousel {...fbCarouselProps}/>
      <Link
        className="fbLinkBtn fbLinkBtnDefault"
        href="/menu" to="/menu"
      >
        {t('common.viewThisWeeksFullMenu')}
      </Link>
    </section>
  </FBSection>
);

export default FBSectionMenuShowCase;
