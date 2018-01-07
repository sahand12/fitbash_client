// @flow
import React, {Component} from 'react';
import type {ComponentType} from 'react';

import {getBrowserOuterWidth} from '../utils/browser';

export type FBCarouselSeatProps = {
  component: ComponentType<*>,
  props: mixed,
};
export type FBCarouselProps = {
  items: FBCarouselSeatProps[],
  breakPoints: Array<{width: string, count: number}>,
}
type State = {
  activeIndex: number,
};
class FBCarousel extends Component<FBCarouselProps, State> {
  static defaultProps = {
    breakPoints: [
      {width: '768px', count: 2},
      {width: '992px', count: 3},
      {width: '1200px', count: 4}
    ]
  };
  state = {
    activeIndex: 0
  };
  getMaxIndex = () => this.props.items.length - this.countVisibleItems();
  countVisibleItems = (): number => {
    const browserWidth = getBrowserOuterWidth();
    const res = this.props.breakPoints
      .filter(bp => browserWidth < parseInt(bp.width, 10));
    return res.length ? res[0].count : this.props.breakPoints[this.props.breakPoints.length - 1].count;
  };
  navClick = (event: SyntheticMouseEvent<HTMLAnchorElement>, direction: 'prev' | 'next') => {
    event.preventDefault();
    let firstIndex;
    if (direction === 'next') {
      firstIndex = Math.min(this.state.activeIndex + 1, this.getMaxIndex());
    }
    else {
      firstIndex = Math.max(this.state.activeIndex - 1, 0);
    }
    this.setState(
      {activeIndex: firstIndex},
      () => {
        const translateX = this.state.activeIndex * (100 / this.countVisibleItems());
        if (this.carouselList) {
          this.carouselList.setAttribute('style', `transform: translateX(${translateX}%)`);
        }
      }
    );
  };
  
  carouselList: ?HTMLUListElement;
  render() {
    return (
      <section className='fbCarousel'>
        <div className={`fbCarousel--navigationWrapper${
            this.state.firstVisibleItemIndex !== 0 ? '' : ' fbCarousel--navigation-isInactive'
          }`}>
          <a
            className='fbCarousel--navigation'
            href='/#'
            onClick={event => this.navClick(event, 'prev')}
          >
            <span className='icon-right'/>
          </a>
        </div>
        <div className='fbCarousel--listWrapper'>
          <ul
            className='fbCarousel--list'
            ref={elem => {this.carouselList = elem}}
          >
            {this.props.items.map((item) => {
              const CarouselItem = item.component;
              return (
                <li className='fbCarousel--listItem' key={item.props.id}>
                  <CarouselItem {...item.props}/>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`fbCarousel--navigationWrapper${
            this.state.firstVisibleItemIndex === this.getMaxIndex() ? ' fbCarousel--navigation-isInactive' : ''
          }`}>
          <a
            className='fbCarousel--navigation'
            href='/#'
            onClick={event => this.navClick(event, 'next')}
          >
            <span className='icon-left'/>
          </a>
        </div>
      </section>
    );
  }
}
export default FBCarousel;
