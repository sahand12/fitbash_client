// @flow
import {Component, type Node} from 'react';

export default class FBTabPanel extends Component<{children: Node}> {
  render() {
    return this.props.children;
  }
}
