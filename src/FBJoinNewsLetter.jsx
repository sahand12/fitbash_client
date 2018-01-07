// @flow
import React from 'react';

import t from './i18n';
import FBSection from './components/FBSection';

const outerStyle = {
  backgroundColor: 'darkslategrey',
  backgroundImage: 'url(/public/img/footer-img-chilli.jpg)',
  backgroundPositionX: 'center',
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const FBJoinNewsLetter = () => (
  <FBSection outerStyle={outerStyle}>
    <article className="FBJoinNewsLetter">
      <section className='fbBox'>
        <h1 className='fbBox--heading'>{t('common.joinHashTag')}</h1>
        <p className='fbBox--p'>
          {t('common.joinHashTagDesc.first')}
          <br/>
          {t('common.joinHashTagDesc.second')}
          <br/>
          {t('common.joinHashTagDesc.third')}
        </p>
        <form>
          <input
            type="text"
            className="fbInput fbInput-leftRight"
            placeholder={t('common.email')}
          />
          <button
            type='submit'
            className='fbBtn fbBtn-primary fbBtn-stretch-l'
          >
            {t('buttons.joinNewsLetter')}
          </button>
        </form>
        <p>{t('common.joinUsConditions')}</p>
      </section>
    </article>
  </FBSection>
);

export default FBJoinNewsLetter;
