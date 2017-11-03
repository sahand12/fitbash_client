// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import type {TRANSLATIONS} from './i18n/fa';

class FBFooter extends Component<{i18n: TRANSLATIONS}, {}> {
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    return (
      <div className="layout-footer">
        <footer className='fbFooter'>
          <FBFooterMobile {...this.props} />
          <FBFooterDesktop {...this.props} />
        </footer>
      </div>
    );
  }
}

const FOOTER_MOBILE_LINKS = {
  blog: '/blog',
  faqs: '/faqs',
  contactUs: '/contact-us',
  termsOfUse: '/terms',
  privacy: '/privacy',
  careers: '/careers',
};
const FOOTER_SOCIAL_LINKS = {
  facebook: 'https://facebook.com/fitbash',
  twitter: 'https://twitter.com/twitter',
  telegram: 'https://telegram.me/fitbash',
  instagram: 'https://instagram.com/fitbash',
};
const FBFooterMobile = (props: {i18n: TRANSLATIONS}) =>(
  <div className='fbFooter--mobile'>
    <ul className='fbFooter--mobileList'>
      {Object.keys(FOOTER_MOBILE_LINKS)
        .map(key => (<FBFooterMobileItem key={key} content={props.i18n[key]} where={FOOTER_MOBILE_LINKS[key]}/>))}
    </ul>
    <ul className='fbFooter--mobileSocialLinks'>
      {Object.keys(FOOTER_SOCIAL_LINKS)
        .map(key => (<FBFooterMobileItem key={key} content='' where={FOOTER_SOCIAL_LINKS[key]} iconClass={`icon-${key}`}/>))}
    </ul>
    {/* @TODO: make year dynamic */}
    <div className='fbFooter--mobileCopyRight'>© {props.i18n.fitbash} ۱۳۹۶</div>
  </div>
);

const FBFooterMobileItem = (props: {content: string, where: string, iconClass?: string}) => (
  <li className='fbFooter--mobileListItem'>
    <Link className='fbLinkBox fbLinkBox-square' href={props.where} to={props.where}>
      {props.iconClass
        ? <i className={props.iconClass}>{props.content}</i>
        : props.content}
    </Link>
  </li>
);
FBFooterMobileItem.defaultProps = {
  iconClass: undefined,
};
const FBFooterDesktop = (props: {i18n: TRANSLATIONS}) => (
  <div className='fbFooter--desktop'>
    <ul className='fbFooter--desktopCol'>
      <li className='fbFooter--desktopLogo'>{props.i18n.fitbash}</li>
      <li>{`© ${props.i18n.fitbash} ۱۳۹۶`}</li>
    </ul>
    <FBFooterDesktopCol
      heading={props.i18n.company}
      items={[
        {name: props.i18n.careers, where: '/careers'},
        {name: props.i18n.contactUs, where: '/contact-us'},
        {name: props.i18n.termsOfUse, where: '/terms'},
        {name: props.i18n.privacy, where: '/privacy'},
      ]}
    />
    <FBFooterDesktopCol
      heading={props.i18n.learnMore}
      items={[
        {name: props.i18n.onTheMenu, where: '/menu'},
        {name: props.i18n.aboutUs, where: '/about-us'},
        {name: props.i18n.ourMission, where: 'our-mission'},
        {name: props.i18n.howItWorks2,where: '/how-it-works'},
        {name: props.i18n.get20$, where: '/get-20$'},
        {name: props.i18n.faqs, where: '/faqs'},
        {name: props.i18n.blog, where: '/blog'}
      ]}
    />
    <ul className="fbFooter--desktopCol">
      <li className='fbFooter--desktopColHeading fbFooter--desktopColSocialHeading'>{props.i18n.joinUs}</li>
      <li className='fbFooter--desktopColSocialRow'>
        <Link href={FOOTER_SOCIAL_LINKS.facebook} to={FOOTER_SOCIAL_LINKS.facebook}><i className='icon-facebook'/></Link>
        <Link href={FOOTER_SOCIAL_LINKS.instagram} to={FOOTER_SOCIAL_LINKS.instagram}><i className='icon-instagram'/></Link>
      </li>
      <li className='fbFooter--desktopColSocialRow'>
        <Link href={FOOTER_SOCIAL_LINKS.telegram} to={FOOTER_SOCIAL_LINKS.telegram}><i className='icon-telegram'/></Link>
        <Link href={FOOTER_SOCIAL_LINKS.twitter} to={FOOTER_SOCIAL_LINKS.twitter}><i className='icon-twitter'/></Link>
      </li>
    </ul>
  </div>
);

const FBFooterDesktopCol = (props: {
  heading: string,
  items: Array<{name: string, where: string}>
}) => (
  <ul className='fbFooter--desktopCol'>
    <li className='fbFooter--desktopColHeading'>{props.heading}</li>
    {props.items.map(item => (
      <li key={item.where}>
        <Link href={item.where} to={item.where}>{item.name}</Link>
      </li>
    ))}
  </ul>
);
export default FBFooter;
