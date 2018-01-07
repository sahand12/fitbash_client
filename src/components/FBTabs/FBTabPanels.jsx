// @flow
/* eslint-disable react/prefer-stateless-function */
import React, {type Node} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class TabPanels extends React.Component<
  {children: Node, className: string}
> {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
  };
  
  render() {
    const {children} = this.props;
    const {activeIndex} = this.context;
    return (
      <div className={cx('fbTabs--tabPanels', this.props.className)}>
        {children[activeIndex]}
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
