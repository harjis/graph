// @flow
import * as React from 'react';

import Node from 'Graph/components/Node/Node';
import {
  connectGraphNodeHeight,
  connectGraphNodeWidth
} from '../../constants/ConnectGraphConstants';

import styles from './InputNode.module.css';
import CenteredText from '../../../Graph/components/NodeContent/CenteredText';

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

const InputNode = (props: Props) => (
  <Node
    height={connectGraphNodeHeight}
    id={props.id}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    styles={styles.inputNode}
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

export default InputNode;
