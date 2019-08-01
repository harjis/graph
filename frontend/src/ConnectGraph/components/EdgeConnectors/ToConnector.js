// @flow
import * as React from 'react';

import { connectGraphNodeWidth } from '../../constants/ConnectGraphConstants';

import styles from './ToConnector.module.css';

type Props = {|
  onClick: (event: SyntheticMouseEvent<Element>) => any
|};
const ToConnector = (props: Props) => (
  <g transform={`translate(${connectGraphNodeWidth / 2}, 0)`} onClick={props.onClick}>
    <polygon className={styles.connector} points="-8,0 8,0 0,12" />
  </g>
);

export default ToConnector;
