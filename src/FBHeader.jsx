// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import type {TRANSLATIONS} from './i18n/fa';

type HeaderPropTypes = {
  i18n: TRANSLATIONS
};
class FBHeader extends Component<HeaderPropTypes, {isMobileNavVisible: boolean}> {
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
                <i className="icon-bars-large" />
              </button>
              <Link className="fbNav--listItem" to='/menu' href='/menu'>
                {this.props.i18n.onTheMenu}
              </Link>
              <Link className="fbNav--listItem" to='/about-us' href='/about-us'>
                {this.props.i18n.aboutUs}
              </Link>
              <Link className='fbNav--listItem' to='our-mission' href='/our-mission'>
                {this.props.i18n.ourMission}
              </Link>
            </section>
            <section className="fbLogo">
              <a href='/'>{this.props.i18n.fitbash}</a>
            </section>
            <section className="fbNav--list">
              <Link className="fbNav--listItem" to='/how-it-works' href='/how-it-works'>
                {this.props.i18n.howItWorks2}
              </Link>
              <Link className="fbNav--listItem" to='/get20$' href='/get20$'>
                {this.props.i18n.get20$}
              </Link>
              <Link className="fbNav--listItem" to='/login' href='/login'>
                {this.props.i18n.logIn}
              </Link>
              <Link to='/signup' href='/signup'>
                <button className="fbBtn fbBtn-primary">{this.props.i18n.signUp}</button>
              </Link>
            </section>
          </nav>
        </div>
        
        <FBMobileNavList
          i18n={this.props.i18n}
          sliderIsClosed={!this.state.isMobileNavVisible}
        />
      </header>
    );
  }
}

const FBMobileNavList = (props: {i18n: TRANSLATIONS, sliderIsClosed: boolean}) => (
  <ul className={`fbNav--mobileList fbSlider${(props.sliderIsClosed ? ' fbSlider-is-closed' : '')}`}>
    <li><Link to='/menu' href='/menu'>{props.i18n.onTheMenu}</Link></li>
    <li><Link to='/about-us' href='/about-us'>{props.i18n.aboutUs}</Link>
    </li><li><Link to='/our-mission' href='/our-mission'>{props.i18n.ourMission}</Link></li>
    <li><Link to='/how-it-works' href='/how-it-works'>{props.i18n.howItWorks2}</Link></li>
    <li><Link to='/get-20$' href='/get-20$'>{props.i18n.get20$}</Link></li>
    <li><Link to='/login' href='/login'>{props.i18n.logIn}</Link></li>
  </ul>
);

export default FBHeader;
