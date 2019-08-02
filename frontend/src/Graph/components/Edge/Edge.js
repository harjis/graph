// @flow
import * as React from 'react';

import { getOriginToOriginBezierPath } from 'Graph/utils/bezierUtils';

import styles from './Edge.module.css';

type Coordinate = { x: number, y: number };
type Props = {|
  from: Coordinate,
  onClick?: () => any,
  styles?: string,
  to: Coordinate,
|};
const Edge = (props: Props) => (
  <path
    onClick={props.onClick}
    d={getOriginToOriginBezierPath(props.from, props.to)}
    className={props.styles || styles.default}
  />
);

export default Edge;
