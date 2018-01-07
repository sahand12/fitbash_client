// @flow
import React from 'react';
import type {Node} from 'react';

import t from './i18n';
import FBSection from './components/FBSection';
import FBCard from './components/FBCard';
import SVGIconCookingPot from './svg/SVGIconCookingPot';
import SVGIconDevices from './svg/SVGIconDevices';
import SVGIconMicrowaveGreen from './svg/SVGIconMicrowaveGreen';

const cards = [
  {
    headerText: t('home.howItWorks.first.heading'),
    headerImg: SVGIconDevices,
    mainText: t('home.howItWorks.first.p')
  },
  {
    headerText: t('home.howItWorks.second.heading'),
    headerImg: SVGIconCookingPot,
    mainText: t('home.howItWorks.second.p')
  },
  {
    headerText: t('home.howItWorks.third.heading'),
    headerImg: SVGIconMicrowaveGreen,
    mainText: t('home.howItWorks.third.p')
  },
];

const FBHowItWorksSection = (): Node => (
  <FBSection>
    <div className='FBHowItWorksSection'>
      <h1 className='fbSection--heading'>{t('common.howItWorks')}</h1>
      <ul className='fbList'>
        {cards.map(card => (
          <li className='fbList--item' key={card.headerText}>
            <FBCard {...card} size='mid'/>
          </li>
        ))}
      </ul>
    </div>
  </FBSection>
);

export default FBHowItWorksSection;
