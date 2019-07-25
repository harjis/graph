// @flow
import * as React from 'react';

type Props = {|
  children: ?React.Node,
  nodeHeight: number,
  nodeWidth: number
|};
export default (props: Props) => (
  <g transform={`translate(${props.nodeWidth / 2}, ${props.nodeHeight / 2})`}>
    <text alignmentBaseline="central" dominantBaseline="central" textAnchor="middle">
      {props.children}
    </text>
  </g>
);