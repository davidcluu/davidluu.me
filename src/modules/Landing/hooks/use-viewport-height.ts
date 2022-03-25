import { use100vh } from 'react-div-100vh';

export default () => use100vh() || (window && window.innerHeight) || 0;
