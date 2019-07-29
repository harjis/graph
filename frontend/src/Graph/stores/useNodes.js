// @flow
import * as React from 'react';

const initialState = {
  draggedNodeId: null,
  nodeOffset: { x: 0, y: 0 },
  nodes: []
};
type OnDragHandler = (event: MouseEvent) => void;
export default function useNodes<
  T: {
    id: number,
    x: number,
    y: number
  }
  //$FlowFixMe
>(initialNodes: T[] = []) {
  const [state, setState] = React.useState({ ...initialState, nodes: initialNodes });

  // Ok this was a bit confusing. If useEffect is not used here new state is not hydrated from props
  // https://stackoverflow.com/questions/54625831/how-to-sync-props-to-state-using-react-hook-setstate
  React.useEffect(() => {
    setState({ ...initialState, nodes: initialNodes });
  }, [initialNodes])


  const onDrag = React.useRef<OnDragHandler>((event: MouseEvent) => {
    setState(state => {
      if (state.draggedNodeId === null) return state;
      const xDiff = state.nodeOffset.x - event.pageX;
      const yDiff = state.nodeOffset.y - event.pageY;

      return {
        ...state,
        nodeOffset: {
          x: event.pageX,
          y: event.pageY
        },
        //$FlowFixMe
        nodes: state.nodes.map(node => {
          if (state.draggedNodeId === node.id) {
            return {
              ...node,
              x: node.x - xDiff,
              y: node.y - yDiff
            };
          } else {
            return node;
          }
        })
      };
    });
  });

  const onStartDrag = (
    draggedNodeId: $PropertyType<T, 'id'>,
    event: SyntheticMouseEvent<Element>
  ) => {
    const { pageX, pageY } = event;
    setState(state => ({ ...state, draggedNodeId, nodeOffset: { x: pageX, y: pageY } }));
    document.addEventListener('mousemove', onDrag.current);
  };

  const onStopDrag = () => {
    document.removeEventListener('mousemove', onDrag.current);
    setState({
      ...state,
      nodeOffset: { x: 0, y: 0 },
      isDragging: false
    });
  };

  return { state, onStartDrag, onStopDrag };
}
