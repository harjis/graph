// @flow
import * as React from 'react';

import CenteredText from 'Graph/components/NodeContent/CenteredText';
import ToConnector from '../EdgeConnectors/ToConnector';
import Node from 'Graph/components/Node/Node';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth
} from '../../constants/ConnectGraphConstants';

import styles from './OutputNode.module.css';

type Props = {|
  children: ?React.Node,
  id: number,
  name: string,
  onClickToConnector: (event: SyntheticMouseEvent<Element>) => any,
  onMouseDown: (event: SyntheticMouseEvent<Element>) => any,
  onMouseUp: (event: SyntheticMouseEvent<Element>) => any,
  styles?: string,
  x: number,
  y: number
|};

const OutputNode = (props: Props) => (
  <Node
    height={connectGraphNodeHeight}
    id={props.id}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    styles={styles.outputNode}
    width={connectGraphNodeWidth}
    x={props.x}
    y={props.y}
  >
    <CenteredText nodeHeight={connectGraphNodeHeight} nodeWidth={connectGraphNodeWidth}>
      {props.name}
    </CenteredText>
    <ToConnector onClick={props.onClickToConnector} />
    {props.children}
  </Node>
);

export default OutputNode;
