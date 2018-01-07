// @flow
import React, {Component} from 'react';

import Spinner from './Spinner';

type PropType = {
  props: mixed,
  loadingPromise: Promise<{default: Component<*, *>}>
}
type StateType = {
  loaded: boolean
}

class AsyncRoute extends Component<PropType, StateType> {
  state = {
    loaded: false
  };
  
  componentDidMount() {
    this.props.loadingPromise
      .then(module => {
        this.component = module.default;
        this.setState({loaded: true});
      });
  }
  
  component = null; // react diffing algorithm will ignore to check this so faster render cycle
  
  render() {
    if (this.state.loaded) {
      // $FlowFixMe
      return <this.component {...this.props.props} />;
    }
    return <Spinner />;
  }
}

export default AsyncRoute;
