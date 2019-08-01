// @flow
import * as React from 'react';

import CenteredText from 'Graph/components/NodeContent/CenteredText';
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
  onMouseDown?: (event: SyntheticMouseEvent<Element>) => any,
  onMouseUp?: (event: SyntheticMouseEvent<Element>) => any,
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
    {props.children}
  </Node>
);

export default OutputNode;
