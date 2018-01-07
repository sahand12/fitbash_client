// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
  outerStyle?: mixed,
  innerStyle?: mixed
}

const FBSection = (props: Props) => (
  <section className="fbSection">
    <div className="fbSection--outer" style={props.outerStyle}>
      <div className="fbSection--inner" style={props.innerStyle}>
        {props.children}
      </div>
    </div>
  </section>
);
FBSection.defaultProps = {
  outerStyle: null,
  innerStyle: null,
};

export default FBSection;
