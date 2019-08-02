// @flow
import * as React from 'react';

import { connectGraphNodeWidth } from '../../constants/ConnectGraphConstants';

import styles from './ToConnector.module.css';

// ToConnector needs hasConnections can because of how SVG works. Edges need to be drawn first so that
// they are rendered under everything else. If ToConnector has connections it means that the Edge arrow
// is rendered under the Node.
type Props = {|
  canConnect: boolean,
  hasToEdges?: boolean,
  onClick: (event: SyntheticMouseEvent<Element>) => any
|};
const ToConnector = (props: Props) => (
  <g
    className={props.canConnect ? styles.canConnect : undefined}
    data-connector-type="to-g"
    transform={`translate(${connectGraphNodeWidth / 2}, 0)`}
    onClick={props.onClick}
  >
    <polygon
      data-connector-type="to-polygon-background"
      className={styles.connector}
      points="-8,0 8,0 0,12"
    />
    {props.hasToEdges && (
      <polygon
        data-connector-type="to-polygon-overlay"
        className={styles.connectedConnector}
        points="-6,0 6,0 0,9"
      />
    )}
  </g>
);

export default ToConnector;
