// @flow
import * as React from 'react';

import useNode from '../../stores/useNode';
import type { Node as NodeType } from '../../stores/useNode';

import styles from './Node.module.css';

type Props = {|
  children: ?React.Node,
  height: number,
  id: number,
  onUpdateNode?: (node: NodeType) => Promise<void>,
  styles?: string,
  width: number,
  x: number,
  y: number
|};

const Node = (props: Props) => {
  const { node, onStartDrag, onStopDrag } = useNode({ x: props.x, y: props.y }, props.onUpdateNode);
  return (
    <g
      onMouseDown={onStartDrag}
      onMouseUp={onStopDrag}
      transform={`translate(${node.x}, ${node.y})`}
    >
      <rect
        data-node-draggable={props.id}
        className={props.styles || styles.container}
        height={props.height}
        width={props.width}
      />
      {props.children}
    </g>
  );
};

export default Node;
