// @flow
import * as React from 'react';

import {
  fromConnectorRadius,
  fromConnectorHoverRadius,
  connectGraphNodeHeight,
  connectGraphNodeWidth
} from '../../constants/ConnectGraphConstants';

import styles from './FromConnector.module.css';

type Props = {|
  onClick: (event: SyntheticMouseEvent<Element>) => any
|};
const FromConnector = (props: Props) => {
  const [isMouseOver, setMouseOver] = React.useState(false);
  return (
    <g
      transform={`translate(${connectGraphNodeWidth / 2}, ${connectGraphNodeHeight})`}
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
