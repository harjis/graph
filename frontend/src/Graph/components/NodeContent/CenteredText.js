// @flow
import * as React from 'react';

import styles from './CenteredText.module.css';

type Props = {|
  children: ?React.Node,
  nodeHeight: number,
  nodeWidth: number
|};
const CenteredText = (props: Props) => (
  <g
    className={styles.text}
    transform={`translate(${props.nodeWidth / 2}, ${props.nodeHeight / 2})`}
  >
    <text alignmentBaseline="central" dominantBaseline="central" textAnchor="middle">
      {props.children}
    </text>
  </g>
);

export default CenteredText;
