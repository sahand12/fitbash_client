// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import t from './i18n';

class FBFooter extends Component<{}, {}> {
  shouldComponentUpdate() {
    return false;
  }
  
  render() {
    return (
      <footer className="layout-footer">
        <div className='fbFooter'>
          <FBFooterMobile/>
          <FBFooterDesktop/>
        </div>
      </footer>
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
const FBFooterMobile = () =>(
  <div className='fbFooter--mobile'>
    <ul className='fbFooter--mobileList'>
      {Object.keys(FOOTER_MOBILE_LINKS)
        .map(key => (<FBFooterMobileItem key={key} content={t([`common.${key}`])} where={FOOTER_MOBILE_LINKS[key]}/>))}
    </ul>
    <ul className='fbFooter--mobileSocialLinks'>
      {Object.keys(FOOTER_SOCIAL_LINKS)
        .map(key => (<FBFooterMobileItem key={key} content='' where={FOOTER_SOCIAL_LINKS[key]} iconClass={`icon-${key}`}/>))}
    </ul>
    {/* @TODO: make year dynamic */}
    <div className='fbFooter--mobileCopyRight'>© {t('common.fitbash')} ۱۳۹۶</div>
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
const FBFooterDesktop = () => (
  <div className='fbFooter--desktop'>
    <ul className='fbFooter--desktopCol'>
      <li className='fbFooter--desktopLogo'>{t('common.fitbash')}</li>
      <li>{`© ${t('common.fitbash')} ۱۳۹۶`}</li>
    </ul>
    <FBFooterDesktopCol
      heading={t('common.company')}
      items={[
        {name: t('common.careers'), where: '/careers'},
        {name: t('common.contactUs'), where: '/contact-us'},
        {name: t('common.termsOfUse'), where: '/terms'},
        {name: t('common.privacy'), where: '/privacy'},
      ]}
    />
    <FBFooterDesktopCol
      heading={t('common.learnMore')}
      items={[
        {name: t('common.onTheMenu'), where: '/menu'},
        {name: t('common.aboutUs'), where: '/about-us'},
        {name: t('common.ourMission'), where: 'our-mission'},
        {name: t('common.howItWorks') ,where: '/how-it-works'},
        {name: t('common.get20$'), where: '/get-20$'},
        {name: t('common.faqs'), where: '/faqs'},
        {name: t('common.blog'), where: '/blog'},
      ]}
    />
    <ul className="fbFooter--desktopCol">
      <li className='fbFooter--desktopColHeading fbFooter--desktopColSocialHeading'>{t('common.joinUs')}</li>
      <li className='fbFooter--desktopColSocialRow'>
        <Link className='fbFooter--desktopColSocialIcon' href={FOOTER_SOCIAL_LINKS.facebook} to={FOOTER_SOCIAL_LINKS.facebook}><i className='icon-facebook'/></Link>
        <Link className='fbFooter--desktopColSocialIcon' href={FOOTER_SOCIAL_LINKS.instagram} to={FOOTER_SOCIAL_LINKS.instagram}><i className='icon-instagram'/></Link>
      </li>
      <li className='fbFooter--desktopColSocialRow'>
        <Link className='fbFooter--desktopColSocialIcon' href={FOOTER_SOCIAL_LINKS.telegram} to={FOOTER_SOCIAL_LINKS.telegram}><i className='icon-telegram'/></Link>
        <Link className='fbFooter--desktopColSocialIcon' href={FOOTER_SOCIAL_LINKS.twitter} to={FOOTER_SOCIAL_LINKS.twitter}><i className='icon-twitter'/></Link>
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
      <li className='fbFooter--desktopColItem' key={item.where}>
        <Link href={item.where} to={item.where}>{item.name}</Link>
      </li>
    ))}
  </ul>
);
export default FBFooter;
