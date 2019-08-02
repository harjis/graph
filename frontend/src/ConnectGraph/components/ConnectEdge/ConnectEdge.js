// @flow
import * as React from 'react';

import Edge from 'Graph/components/Edge/Edge';
import type { Node } from '../../constants/ConnectGraphTypes';
import { getNodeBottomMiddlePosition, getNodeTopMiddlePosition } from '../../utils/nodeUtils';

import styles from './ConnectEdge.module.css';

type Props = {|
  fromNode: Node,
  onClick: () => any,
  toNode: Node
|};
const ConnectEdge = (props: Props) => {
  const to = getNodeTopMiddlePosition(props.toNode);
  return (
    <g>
      <Edge
        from={getNodeBottomMiddlePosition(props.fromNode)}
        onClick={props.onClick}
        styles={styles.line}
        to={to}
      />
      <polygon
        className={styles.triangle}
        transform={`translate(${to.x},${to.y})`}
        points="-6,0 6,0 0,9"
      />
    </g>
  );
};

export default ConnectEdge;
