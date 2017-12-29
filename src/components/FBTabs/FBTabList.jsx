// @flow
import React, {Component, type Node} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

/* eslint-disable react/prefer-stateless-function */
export default class FBTabList extends Component<
  {children: Node, className: string}
> {
  static defaultProps = {
    className: '',
  };
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
  };
  
  render() {
    const {activeIndex, onSelect} = this.context;
    const children = React.Children.map(this.props.children, (child, index) =>
      React.cloneElement(child, {
        isActive: activeIndex === index,
        onSelect: () => onSelect(index)
      })
    );
    
    return (
      <ul className={cx('fbTabs--tabList', this.props.className)}>
        {children}
      </ul>
    );
  }
}
