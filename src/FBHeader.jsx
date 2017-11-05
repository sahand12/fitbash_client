// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import t from './i18n';

class FBHeader extends Component<{}, {isMobileNavVisible: boolean}> {
  state = {
    isMobileNavVisible: false
  };

  toggleMobileNav = () => this.setState({isMobileNavVisible: !this.state.isMobileNavVisible});

  render() {
    return (
      <header className='layout-header'>
        <div className="layout-nav">
          <nav className='fbNav'>
            <section className='fbNav--list'>
              <button
                className="fbBtn fbBtn-bare fbBtn-square-m fbNav--bars"
                onClick={this.toggleMobileNav}
              >
                <i className="icon-bars" />
              </button>
              <Link className="fbNav--listItem" to='/menu' href='/menu'>
                {t('common.onTheMenu')}
              </Link>
              <Link className="fbNav--listItem" to='/about-us' href='/about-us'>
                {t('common.aboutUs')}
              </Link>
              <Link className='fbNav--listItem' to='our-mission' href='/our-mission'>
                {t('common.ourMission')}
              </Link>
            </section>
            <section className="fbLogo">
              <a href='/'>{t('common.fitbash')}</a>
            </section>
            <section className="fbNav--list">
              <Link className="fbNav--listItem" to='/how-it-works' href='/how-it-works'>
                {t('common.howItWorks')}
              </Link>
              <Link className="fbNav--listItem" to='/get20$' href='/get20$'>
                {t('common.get20$')}
              </Link>
              <Link className="fbNav--listItem" to='/login' href='/login'>
                {t('common.signIn')}
              </Link>
              <Link to='/signup' href='/signup'>
                <button className="fbBtn fbBtn-primary">{t('common.signUp')}</button>
              </Link>
            </section>
          </nav>
        </div>
        
        <FBMobileNavList
          sliderIsClosed={!this.state.isMobileNavVisible}
        />
      </header>
    );
  }
}

const FBMobileNavList = (props: {sliderIsClosed: boolean}) => (
  <ul className={`fbNav--mobileList fbSlider${(props.sliderIsClosed ? ' fbSlider-is-closed' : '')}`}>
    <li><Link to='/menu' href='/menu'>{t('common.onTheMenu')}</Link></li>
    <li><Link to='/about-us' href='/about-us'>{t('common.aboutUs')}</Link>
    </li><li><Link to='/our-mission' href='/our-mission'>{t('common.ourMission')}</Link></li>
    <li><Link to='/how-it-works' href='/how-it-works'>{t('common.howItWorks')}</Link></li>
    <li><Link to='/get-20$' href='/get-20$'>{t('common.get20$')}</Link></li>
    <li><Link to='/login' href='/login'>{t('common.signIn')}</Link></li>
  </ul>
);

export default FBHeader;
