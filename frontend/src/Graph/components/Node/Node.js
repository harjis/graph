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

// Notice: Event handlers should not be attached to g. If you have components with handlers inside Node
// it would make these handlers fire as well.
const Node = (props: Props) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    <rect
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      className={props.styles || styles.container}
      height={props.height}
      width={props.width}
    />
    {props.children}
  </g>
);

export default Node;
