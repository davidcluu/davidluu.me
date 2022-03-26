import { use100vh } from 'react-div-100vh';

import { isBrowser } from '../../../constants';

export default () =>
  use100vh() || (isBrowser ? window && window.innerHeight : 0);
