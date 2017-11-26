// @flow
import React from 'react';
import {Link} from 'react-router-dom';

import t from './i18n';

const FBHero = () => (
  <section className='layout-hero'>
    <div className='fbHeroWrapper'>
      <div className="fbHeroWrapper--image" />
      <div className='fbHero'>
        <FBHeroHeader/>
        <FBHeroForm/>
        <FBHeroFooter/>
      </div>
    </div>
  </section>
);

const FBHeroForm = () => (
  <form className='fbHero--form'>
    <input
      type='text'
      className='fbInput fbInput-leftRight'
      placeholder={t('common.email')}
    />
    <input
      type='text'
      className='fbInput fbInput-leftRight'
      placeholder={t('common.mobileNumber')}
    />
    <button
      className='fbBtn fbBtn-primary fbBtn-stretch-l'
      type='submit'
    >
      {t('common.getStartedLong')}
    </button>
  </form>
);
const FBHeroHeader = () => (
  <header className='fbHero--header'>
    <h1 className='fbHero--headerHeading'>{t('home.hero.heading')}</h1>
    <h2 className='fbHero--headerSubheading'>
      {t('common.freshLong')} <span> &#x2022; </span>
      {t('common.healthy')} <span> &#x2022; </span>
      {t('common.convenient')}
    </h2>
  </header>
);
const FBHeroFooter = () => (
  <footer className='fbHero--footer'>
    <p>
      {t('home.hero.alreadyAUser')}
      <Link className='fbLinkBox-mountainMeadow fbHero--footerLoginBtn' href='/login' to='/login'>{t('common.logIn')}</Link>
    </p>
    <p className='fbHero--footerTerms'>
      {t('home.hero.termsAgreement.first')}&nbsp;
      <Link className='fbLinkBox-aluminum' href='/privacy-policy' to='/privacy-policy'>{t('common.privacyPolicy')}</Link>
      &nbsp;{t('common.and')}&nbsp;
      <Link className='fbLinkBox-aluminum' href='/terms' to='/terms'>{t('common.termsOfUse')}</Link>&nbsp;
      {t('home.hero.termsAgreement.second')}.
    </p>
  </footer>
);
export default FBHero;
