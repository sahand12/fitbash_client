// @flow
import Polyglot from 'node-polyglot';

import {FA} from './fa';

const polyglot = new Polyglot({phrases: FA});
export default polyglot.t.bind(polyglot);