// @flow
import * as React from 'react';

export type Node = { x: number, y: number };
type UpdateNode = (node: Node) => Promise<void>;
type OnDragHandler = (event: MouseEvent) => void;
type Offset = {| x: number, y: number |};
type State = {|
  nodeOffset: Offset,
  node: Node
|};
const initialState: State = {
  nodeOffset: { x: 0, y: 0 },
  node: { x: 0, y: 0 }
};

type Return = {|
  node: Node,
  onStartDrag: (event: SyntheticMouseEvent<Element>) => void,
  onStopDrag: () => Promise<void>
|};
export default function useNode(initialNode: Node, updateNode: ?UpdateNode): Return {
  const [state, setState] = React.useState<State>({ ...initialState, node: initialNode });

  const onDrag = React.useRef<OnDragHandler>((event: MouseEvent) => {
    setState(state => {
      const xDiff = state.nodeOffset.x - event.pageX;
      const yDiff = state.nodeOffset.y - event.pageY;

      return {
        ...state,
        nodeOffset: {
          x: event.pageX,
          y: event.pageY
        },
        node: {
          ...state.node,
          x: state.node.x - xDiff,
          y: state.node.y - yDiff
        }
      };
    });
  });

  const onStartDrag = event => {
    const { pageX, pageY } = event;
    setState(state => ({ ...state, nodeOffset: { x: pageX, y: pageY } }));
    window.addEventListener('mousemove', onDrag.current);
  };

  const onStopDrag = async () => {
    window.removeEventListener('mousemove', onDrag.current);
    setState(state => ({
      ...state,
      nodeOffset: initialState.nodeOffset
    }));
    if (state.node && typeof updateNode === 'function') {
      await updateNode(state.node);
    }
  };

  return { node: state.node, onStartDrag, onStopDrag };
}
