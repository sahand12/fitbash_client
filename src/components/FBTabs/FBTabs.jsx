// @flow
import React, {Component} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export default class FBTabs extends Component<
  {children: Node, className: string},
  {activeIndex: number}
> {
  static childContextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    className: '',
  };
  
  state = {
    activeIndex: 0,
  };
  
  getChildContext() {
    return {
      activeIndex: this.state.activeIndex,
      onSelect: this.handleSelected,
    };
  }
  
  handleSelected = (index: number) => {
    this.setState({activeIndex: index});
  };
  
  render() {
    const {children, className} = this.props;
    return (
      <div className={cx('fbTabs', className)}>
        {children}
      </div>
    );
  }
}
