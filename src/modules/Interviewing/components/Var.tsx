import { Fragment } from 'react';

interface VarProps {
  value: any;
}

const Var = ({ value }: VarProps) => <Fragment>{value}</Fragment>;

export default Var;
