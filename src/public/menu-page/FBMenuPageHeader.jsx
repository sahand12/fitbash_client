// @flow
import React from 'react';

import FBSection from '../../components/FBSection';
import t from '../../i18n';

const menuPageHeaderImgUrl = '/public/img/menu-page-header.jpg';

const outerStyle = {
  backgroundImage: `url('${menuPageHeaderImgUrl}')`,
  backgroundRepeat: 'no-repeat',
  backgroundPositionX: '50%',
  backgroundPositionY: '65%',
  backgroundSize: 'cover',
  borderTop: 'none',
  height: '30rem',
};
const FBMenuPageHeader = () => (
  <FBSection outerStyle={outerStyle}>
    <header className='fbMenuPageHeader'>
      <h1 className='fbMenuPageHeader--title'>{t('menuPage.headerTitle')}</h1>
    </header>
  </FBSection>
);

export default FBMenuPageHeader;
