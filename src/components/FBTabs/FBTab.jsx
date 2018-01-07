// @flow
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prefer-stateless-function */
import React, {Component, type Node} from 'react';
import cx from 'classnames';

export default class FBTab extends Component<
  {
    activeClassName: string,
    children: Node,
    className?: string,
    isActive: boolean,
    isDisabled?: boolean,
    onSelect: Function
  }
> {
  static defaultProps = {isDisabled: false, className: '', activeClassName: ''};
  
  render() {
    const {activeClassName, children, isActive, isDisabled, onSelect} = this.props;
    const className = cx(this.props.className, {
      'fbTabs--tab': true,
      [activeClassName]: isActive,
      'fbTabs--tab-isDisabled': isDisabled,

    });
    return (
      <li
        className={className}
        onClick={onSelect}
        disabled={isDisabled}
      >{children}</li>
    );
  }
};
/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-enable react/prefer-stateless-function */
