// @flow
import React from 'react';

import type {TRANSLATIONS} from './i18n/fa';

const FBHero = (props: {i18n: TRANSLATIONS}) => (
  <section className='layout-hero'>
    <div className='fbHeroWrapper'>
      <div className="fbHeroWrapper--image" />
      <div className='fbHero'>
        <FBHeroHeader {...props}/>
        <FBHeroForm {...props}/>
        <FBHeroFooter {...props}/>
      </div>
    </div>
  </section>
);

const FBHeroForm = (props: {i18n: TRANSLATIONS}) => (
  <section className='fbHero--form'>
    <input type='text'/>
    <input type='text'/>
    <button type='submit'>{props.i18n.getStarted}</button>
  </section>
);
const FBHeroHeader = (props: {i18n: TRANSLATIONS}) => (
  <header className='fbHero--header'>
    <h1>{props.i18n.heroHeaderH1}</h1>
    <h2>{props.i18n.heroHeaderH2}</h2>
  </header>
);
const FBHeroFooter = (props: {i18n: TRANSLATIONS}) => (
  <footer className='fbHero--footer'>
    <p>{props.i18n.heroFooterFirstLine}</p>
    <p>{props.i18n.heroFooterSecondLine}</p>
  </footer>
);
export default FBHero;

