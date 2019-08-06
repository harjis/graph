// @flow
import * as React from 'react';

import BottomLeftText from 'Graph/components/NodeContent/BottomLeftText';
import CenteredText from 'Graph/components/NodeContent/CenteredText';
import FromConnector from '../EdgeConnectors/FromConnector';
import Node from 'Graph/components/Node/Node';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth
} from '../../constants/ConnectGraphConstants';

import styles from './OutputNode.module.css';

// NOTICE: Props can not be exact because of how InputNodes are used.
type Props = {
  children: ?React.Node,
  id: number,
  name: string,
  onClickFromConnector: (event: SyntheticMouseEvent<Element>) => any,
  onMouseDown: (event: SyntheticMouseEvent<Element>) => any,
  onMouseUp: (event: SyntheticMouseEvent<Element>) => any,
  styles?: string,
  x: number,
  y: number
};

const NodeRefNode = (props: Props) => (
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
    <BottomLeftText
      styles={styles.nodeRefNodeBottomText}
      nodeHeight={connectGraphNodeHeight}
      nodeWidth={connectGraphNodeWidth}
    >
      Node reference
    </BottomLeftText>
    <FromConnector onClick={props.onClickFromConnector} />
    {props.children}
  </Node>
);

export default NodeRefNode;
