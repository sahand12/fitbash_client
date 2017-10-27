// @flow
import React from 'react';
import {Link} from 'react-router-dom';

type HeaderPropTypes = {
  i18n: {
    [string]: string,
    onTheMenu: string,
    whyFitBash: string,
    ourMission: string,
    howItWorks: string,
    get20$: string,
    logIn: string,
    signUp: string,
    fitbash: string,
  }
}

const Header = (props: HeaderPropTypes) => (
  <header className='layout-header'>
    <div className="layout-nav">
      <nav className='fbNav'>
        <section>
          <Link to='/menu' href='/menu'>{props.i18n.onTheMenu}</Link>
          <Link to='/why-fitbash' href='/why-fitbash'>{props.i18n.whyFitBash}</Link>
          <Link to='our-mission' href='/our-mission'>{props.i18n.ourMission}</Link>
        </section>
        <section>
          <a href='/'>{props.i18n.fitbash}</a>
        </section>
        <section>
          <Link to='/how-it-works' href='/how-it-works'>{props.i18n.howItWorks}</Link>
          <Link to='/get20$' href='/get20$'>{props.i18n.get20$}</Link>
          <Link to='/login' href='/login'>{props.i18n.logIn}</Link>
          <Link to='/signup' href='/signup'>
            <button>{props.i18n.signUp}</button>
          </Link>
        </section>
      </nav>
    </div>
    <div className="box-container">
      <div className="box">1</div>
      <div className="box">2</div>
      <div className="box">3</div>
      <div className="box">4</div>
    </div>
  </header>
);

export default Header;
