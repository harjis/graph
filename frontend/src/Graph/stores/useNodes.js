// @flow
import * as React from 'react';

import { getMouseOffsetRelativeToElement } from '../utils/coordinate_utils';

type Node = {|
  id: string,
  x: number,
  y: number
|};

const initialState = {
  isDragging: false,
  nodeOffset: { x: 0, y: 0 },
  nodes: []
};
export default function useNodes(initialNodes: Node[] = []) {
  const [state, setState] = React.useState({ ...initialState, nodes: initialNodes });

  const startDrag = (id: $PropertyType<Node, 'id'>, event: SyntheticMouseEvent<Element>) => {
    setState({
      ...state,
      isDragging: true,
      nodeOffset: getMouseOffsetRelativeToElement(event)
    });
  };
  const drag = (id: $PropertyType<Node, 'id'>, event: SyntheticMouseEvent<Element>) => {
    const bbox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    if (state.isDragging) {
      setState({
        ...state,
        nodes: state.nodes.map<Node>((node: Node) => {
          if (id === node.id) {
            return {
              ...node,
              x: node.x - (state.nodeOffset.x - x),
              y: node.y - (state.nodeOffset.y - y)
            };
          } else {
            return node;
          }
        })
      });
    }
  };
  const stopDrag = () => {
    setState({
      ...state,
      isDragging: false
    });
  };

  return { state, startDrag, stopDrag, drag };
}
