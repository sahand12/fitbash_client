// @flow
import React from 'react';
import {Link} from 'react-router-dom';

import type {TRANSLATIONS} from "./i18n/fa";

type FooterPropTypes = {
  i18n: TRANSLATIONS
};

const FBFooter = (props: FooterPropTypes) => (
  <footer className='fbFooter'>
    <div className='fbFooter--mobile'>
      <ul className='fbFooter--mobileList'>
        <li>
          <Link className='fbLinkBox' href='/blog' to='/blog'>{props.i18n.blog}</Link>
        </li>
        <li>
          <Link className='fbLinkBox' href='/careers' to='/careers'>{props.i18n.careers}</Link>
        </li>
        <li>
          <Link className='fbLinkBox' href='/contact-us' to='/contact-us'>{props.i18n.contactUs}</Link>
        </li>
        <li>
          <Link  className='fbLinkBox' href='/terms' to='/terms'>{props.i18n.termsOfUse}</Link>
        </li>
        <li>
          <Link className='fbLinkBox' href='/privacy' to='/privacy'>{props.i18n.privacy}</Link>
        </li>
        <li>
          <Link className='fbLinkBox' href='/faqs' to='/faqs'>{props.i18n.faqs}</Link>
        </li>
      </ul>
    </div>
    <div className="fbFooter--desktop" />
  </footer>
);

export default FBFooter;
