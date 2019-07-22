// @flow
import * as React from 'react';

import styles from './Node.module.css';

type Props = {|
  children: ?React.Node,
  height: number,
  styles?: string,
  width: number,
  x: number,
  y: number
|};

export default (props: Props) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    <rect className={props.styles || styles.container} height={props.height} width={props.width} />
    {props.children}
  </g>
);
