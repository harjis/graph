// @flow
import * as React from 'react';

import styles from './Node.module.css';

type Props = {|
  children: ?React.Node,
  height: number,
  id: number,
  onMouseDown?: (event: SyntheticMouseEvent<Element>) => any,
  onMouseUp?: (event: SyntheticMouseEvent<Element>) => any,
  styles?: string,
  width: number,
  x: number,
  y: number
|};

const Node = (props: Props) => (
  <g
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    transform={`translate(${props.x}, ${props.y})`}
  >
    <rect className={props.styles || styles.container} height={props.height} width={props.width} />
    {props.children}
  </g>
);

export default Node;
