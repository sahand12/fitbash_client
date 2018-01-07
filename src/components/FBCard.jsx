// @flow
import React from 'react';
import type {ComponentType, Node} from 'react';

type Props = {
  headerText: string,
  // React.ComponentType<Props> is a union of stateless functional components and class components where `Props` is the defined type of the component's props.
  headerImg: ComponentType<*>,
  mainText: string,
  size: 'small' | 'mid' | 'large',
};

const FBCard = (props: Props): Node => {
  const Img: ComponentType<*> = props.headerImg;
  return (
    <article className={`fbCard fbCard--${props.size}`}>
      <section className="fbCard--header">
        <Img />
      </section>
      <section>
        <h1 className="fbCard--heading">{props.headerText}</h1>
        <p className="fbCard--main">{props.mainText}</p>
      </section>
    </article>
  );
};

export default FBCard;
