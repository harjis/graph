// @flow
import * as React from 'react';

import styles from './Node.module.css';

type Props = {|
  children: ?React.Node,
  height: number,
  id: number,
  onMouseDown?: (event: SyntheticMouseEvent<Element>) => void,
  onMouseMove?: (event: SyntheticMouseEvent<Element>) => void,
  onMouseUp?: (event: SyntheticMouseEvent<Element>) => void,
  styles?: string,
  width: number,
  x: number,
  y: number
|};

export default (props: Props) => (
  <g
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseMove={props.onMouseMove}
    transform={`translate(${props.x}, ${props.y})`}
  >
    <rect
      data-node-draggable={props.id}
      className={props.styles || styles.container}
      height={props.height}
      width={props.width}
    />
    {props.children}
  </g>
);