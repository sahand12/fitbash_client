// @flow;
import React, {Component, type Node} from 'react';

type Props = {
  children: React.Node,
  title?: string,
}

class FBMenuSection extends Component<Props> {
  static defaultProps = {
    title: undefined,
  };
  
  render() {
    const {title, children} = this.props;
    return (
      <section className="fbMenuSection">
        {title !== undefined && title !== null && title !== '' &&
          <h2 className="fbMenuSection--heading">{title}</h2>
        }
        <div className="fbMenuSection--body">
          {children}
        </div>
      </section>
    );
  }
}

export default FBMenuSection;
