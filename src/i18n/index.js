// @flow
import Polyglot from 'node-polyglot';

import {FA} from './fa';

const polyglot = new Polyglot({phrases: FA});
export default polyglot.t.bind(polyglot);

export const tArray = function tArray(strings: Array<string>) {
  return strings.map(str => polyglot.t(str));
};
