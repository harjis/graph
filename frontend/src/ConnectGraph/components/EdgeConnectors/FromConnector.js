// @flow
import * as React from 'react';

import {
  fromConnectorRadius,
  fromConnectorHoverRadius
} from '../../constants/ConnectGraphConstants';

import styles from './FromConnector.module.css';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from '../../../Graph/constants/GraphConstants';

type Props = {|
  onClick: (event: SyntheticMouseEvent<Element>) => any
|};
const FromConnector = (props: Props) => {
  const [isMouseOver, setMouseOver] = React.useState(false);
  return (
    <g
      transform={`translate(${DEFAULT_NODE_WIDTH / 2}, ${DEFAULT_NODE_HEIGHT})`}
      onClick={props.onClick}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <circle
        className={styles.connector}
        r={isMouseOver ? fromConnectorHoverRadius : fromConnectorRadius}
      />
    </g>
  );
};

export default FromConnector;
