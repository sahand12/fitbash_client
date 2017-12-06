// @flow
import Polyglot from 'node-polyglot';

import {FA} from './fa';

const polyglot = new Polyglot({phrases: FA});
export default polyglot.t.bind(polyglot);

export const tArray = function tArray(strings: Array<string>) {
  return strings.map(str => polyglot.t(str));
};

const enToFaNums = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰',
}
export const tNum = function translateNumber(n: number): string {
  return n.toString()
    .split('')
    .map(char => enToFaNums[char])
    .join('');
};
