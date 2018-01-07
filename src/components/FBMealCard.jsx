// @flow
import React from 'react';
// import type {StatelessFunctionalComponent} from 'react';
import {Link} from 'react-router-dom';

export type FBMealCardProps = {
  id: string,
  url: string,
  imgSrc: string,
  name: string,
  description?: string,
  tag?: string,
  onMealCardClick?: Function,
}

const FBMealCard = (props: FBMealCardProps) => (
  <article className='fbMealCard' data-mealid={props.id}>
    <Link
      href={props.url} to={props.url}
      onClick={props.onMealCardClick}
    >
      <div
        className='fbMealCard--img'
        style={{backgroundImage: `url(${props.imgSrc})`}}
      />
      <h1 className='fbMealCard--name'>{props.name}</h1>
      {props.description ? <p className='fbMealCard--description'>{props.description}</p> : ''}
      {props.tag ? 'tag' : ''}
    </Link>
  </article>
);
FBMealCard.defaultProps = {
  description: undefined,
  tag: undefined,
  onMealCardClick: function noop() {},
};

export default FBMealCard;
