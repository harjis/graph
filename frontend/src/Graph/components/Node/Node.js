// @flow
import * as React from 'react';

type Props = {|
  children: ?React.Node,
  height: number,
  width: number,
  x: number,
  y: number
|};

export default (props: Props) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    <rect height={props.height} width={props.width} />
    {props.children}
  </g>
);
