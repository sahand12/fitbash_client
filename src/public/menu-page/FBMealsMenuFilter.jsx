// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import t, {tNum} from '../../i18n';
import FBSection from '../../components/FBSection';
import {colors} from '../../styles';
import {mealFilters} from '../../data';

const outerStyle = {
  borderBottom: `1px solid ${colors.zircon}`,
  zIndex: 10,
  position: 'relative',
};
const innerStyle = {
  padding: '0',
  border: 'none',
};

type FBMealsFilterProps = {
  types: {name: string}[],
  filters: string[],
}
type FBMealsFilterState = {
  listVisible: boolean,
  selected: Array<{name: string, id: string}>,
};
class FBMealsMenuFilter extends Component<FBMealsFilterProps, FBMealsFilterState> {
  state = {
    listVisible: false,
    selected: [],
  };
  toggleListVisibility = () => {
    this.setState((prevState) => {
      return ({listVisible: !prevState.listVisible});
    });
  };
  onFilterSelectionChanged = (box: {name: string, id: string}) => {
    const isSelected = !!this.state.selected.find(item => item.id === (box && box.id));
    if (isSelected) {
      this.setState(prevState => ({
        selected: prevState.selected.filter(item => item.id !== box.id)
      }));
    }
    else {
      this.setState(prevState => ({
        selected: [...prevState.selected, box],
      }));
    }
  };

  render() {
    return (
      <FBSection outerStyle={outerStyle} innerStyle={innerStyle}>
        <div className='fbMealsMenuFilter'>
          <ul className={`fbMealsMenuFilter--mealTypes ${this.state.listVisible ? 'fbHidden' : ''}`}>
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
            <button className='fbBtn' onClick={this.toggleListVisibility}>
              {this.state.selected.length === 0 
                ? t('common.filter') 
                : `${t('common.filtering')} (${tNum(this.state.selected.length)})`
              }
              <span dir='ltr'>{this.state.listVisible ? '↑' : '↓'}</span>
            </button>
          </section>
        </div>
        <div 
          style={{display: this.state.listVisible ? 'block' : 'none'}} 
          className='fbMealsMenuFilter--filterBox'
        >
          <FBFilterBox
            headerText={t('menuPage.filterBox.header')}
            footerText={t('menuPage.filterBox.footer')}
            boxes={mealFilters.map(name => ({name: t(`common.${name}`), id: name}))}
            selected={this.state.selected}
            onSelectionChanged={this.onFilterSelectionChanged}
          />
        </div>
      </FBSection>
    );
  }
}

type FBFilterBoxProps = {
  boxes: Array<{name: string, id: string}>,
  selected: Array<{name: string, id: string}>,
  headerText: string,
  footerText: string,
  className?: string,
  onSelectionChanged: Function,
}
class FBFilterBox extends Component<FBFilterBoxProps> {
  static defaultProps = {
    className: '',
  };
  toggleSelected = (id: string) => {
    const [box] = this.props.boxes.filter(box => box.id === id);
    this.props.onSelectionChanged(box);
  };
  isSelected = (id) => {
    return !!this.props.selected.find(item => item.id === id);
  };
  render() {
    return (
      <section className={`fbFilterBox ${this.props.className}`}>
        <header className='fbFilterBox--header'>{this.props.headerText}</header>
        <main className='fbFilterBox--main'>
          <ul className='fbRow-5-2 fbFilterBox--boxesContainer'>
            {this.props.boxes.map(item => (
              <li 
                key={item.id} 
                className='fbRow-5-2--col fbFilterBox--boxItem'
                onClick={() => this.toggleSelected(item.id)}
              >
                {this.isSelected(item.id) 
                  ? <span className='fbFilterBox--boxIcon'>
                      <span className='icon-blocked' />
                    </span>
                  : null
                }
                <span 
                  className={`fbFilterBox--boxText ${
                    this.isSelected(item.id) ? 'fbFilterBox--boxText-selected' : ''
                  }`}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </main>
        <footer className='fbFilterBox--footer'>{this.props.footerText}</footer>
      </section>
    );
  }
}

export default FBMealsMenuFilter;
