// @flow
import React from 'react';
import type {Node} from 'react';
import {Link} from 'react-router-dom';

import t from './i18n';
import FBSection from './components/FBSection';
import SVGIconGlutenFree from './svg/SVGIconGlutenFree';
import SVGIconProtein from './svg/SVGIconProtein';
import SVGIconNoSugar from './svg/SVGIconNoSugar';
import SVGIconAllNatural from './svg/SVGIconAllNatural';

const items = [
  {icon: SVGIconGlutenFree, text: t('home.ourChefs.first')},
  {icon: SVGIconProtein, text: t('home.ourChefs.second')},
  {icon: SVGIconNoSugar, text: t('home.ourChefs.third')},
  {icon: SVGIconAllNatural, text: t('home.ourChefs.forth')},
];

const outerStyle = {
  backgroundColor: 'darkslategrey',
  backgroundImage: 'url(/public/img/our-chefs-bg.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundPositionX: 'center',
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
};
const FBOurChefs = (): Node => (
  <FBSection outerStyle={outerStyle}>
    <div className='FBOurChefs'>
      <h1 className='fbSection--heading'>{t('home.ourChefs.heading')}</h1>
      <ul className='fbList'>
        {items.map(item => {
          const Icon = item.icon;
          return (
            <li key={item.text} className='fbList--item'>
              <section className="FBOurChefs--item">
                <Icon/>
                <p>{item.text}</p>
              </section>
            </li>
          );
        })}
      </ul>
      <Link
        className='fbLinkBtn fbLinkBtn-default'
        href='/menu' to='/menu'
      >
        {t('home.ourChefs.btn')}
      </Link>
    </div>
  </FBSection>
);

export default FBOurChefs;
