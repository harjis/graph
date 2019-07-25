// @flow
import * as React from 'react';

import { getMouseOffsetRelativeToElement } from '../utils/coordinate_utils';

const initialState = {
  isDragging: false,
  nodeOffset: { x: 0, y: 0 },
  nodes: []
};
export default function useNodes<
  T: {
    id: number,
    x: number,
    y: number
  }
  //$FlowFixMe
>(initialNodes: T[] = []) {
  const [state, setState] = React.useState({ ...initialState, nodes: initialNodes });

  const onStartDrag = (event: SyntheticMouseEvent<Element>) => {
    setState({
      ...state,
      isDragging: true,
      nodeOffset: getMouseOffsetRelativeToElement(event)
    });
  };
  const onDrag = (id: $PropertyType<T, 'id'>, event: SyntheticMouseEvent<Element>) => {
    const bbox = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bbox.left;
    const y = event.clientY - bbox.top;
    if (state.isDragging) {
      setState({
        ...state,
        //$FlowFixMe
        nodes: state.nodes.map<T>(node => {
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
  const onStopDrag = () => {
    setState({
      ...state,
      isDragging: false
    });
  };

  return { state, onStartDrag, onStopDrag, onDrag };
}
