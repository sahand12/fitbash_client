// @flow
import * as React from 'react';

const FBSection = (props: {children: React.Node, outerStyle?: mixed}) => (
  <section className="fbSection">
    <div className="fbSection--outer" style={props.outerStyle}>
      <div className="fbSection--inner">
        {props.children}
      </div>
    </div>
  </section>
);
FBSection.defaultProps = {
  outerStyle: null
};

export default FBSection;
