
// @flow
import React from 'react';

import t, {tNum} from '../../i18n';

type Props = {
  filterListVisible: boolean,
  count: number,
  onClick: Function,
};
const FBMenuFilterLink = function FBMenuFilterLink(props: Props) {
  return (
    <div className="fbMenuFilter--link">
      <button
        className={`fbBtn fbMenuFilter--link--btn${props.count > 0 ? ' fbMenuFilter--link--btn--isFiltering' : ''}`}
        onClick={props.onClick}
      >
        {props.count === 0
          ? t('common.filter')
          : `${t('common.filtering')} (${tNum(props.count)})`
        }
        <span>{props.filterListVisible ? '↑' : '↓'}</span>
      </button>
    </div>
  );
};
FBMenuFilterLink.defaultProps = {
  count: 0,
};

export default FBMenuFilterLink;
