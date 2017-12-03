// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import t from '../../i18n';
import FBSection from '../../components/FBSection';
import {colors} from '../../styles';

type Props = {
  types: Array<{name: string}>,
  filters: Array<string>,
}
const outerStyle = {
  borderBottom: `1px solid ${colors.zircon}`,
};
const innerStyle = {
  padding: '0',
  border: 'none',
};

type State = {
  isModalOpen: boolean,
};
class FBMealsMenuFilter extends Component<Props, State> {
  state = {
    isModalOpen: false,
  };
  onFilterBtnClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.setState(prevState => ({isModalOpen: !prevState.isModalOpen}));
  };
  render() {
    return (
      <FBSection outerStyle={outerStyle} innerStyle={innerStyle}>
        <div className='fbMealsMenuFilter'>
          <ul className='fbMealsMenuFilter--mealTypes'>
            {this.props.types.map(type => (
              <li className='fbMealsMenuFilter--mealType' key={type.name}>
                <Link
                  className='fbLink'
                  href={`#${type.name}Meals`} to={`#${type.name}Meals`}
                >
                  {type.name}
                </Link>
              </li>
            ))}
          </ul>
          <section className='fbMealsMenuFilter--filterLink'>
            <button className='fbBtn' onClick={this.onFilterBtnClick}>
              {t('common.filter')}
              <span dir='ltr'>{this.state.isModalOpen ? '↑' : '↓'}</span>
            </button>
          </section>
        </div>
        <section className='fbMealsMenuFiltersList'></section>
      </FBSection>
    );
  }
}

export default FBMealsMenuFilter;
