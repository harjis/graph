// @flow
import * as React from 'react';

import { getOriginToOriginBezierPath } from 'Graph/utils/bezierUtils';

import styles from './Edge.module.css';

type Coordinate = { x: number, y: number };
type Props = {|
  from: Coordinate,
  to: Coordinate,
  styles?: string
|};
const Edge = (props: Props) => (
  <path
    d={getOriginToOriginBezierPath(props.from, props.to)}
    className={props.styles || styles.default}
  />
);

export default Edge;
