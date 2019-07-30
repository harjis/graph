// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import type { NodeAction } from '../constants/ConnectGraphTypes';

type Offset = {| x: number, y: number |};
type State = {|
  draggedNodeId: ?number,
  error: ?string,
  isLoaded: boolean,
  isLoading: boolean,
  nodeOffset: Offset,
  nodes: Node[]
|};
export const initialState = {
  draggedNodeId: null,
  error: null,
  isLoaded: false,
  isLoading: true,
  nodeOffset: { x: 0, y: 0 },
  nodes: []
};
export default function nodeReducer(state: State, action: NodeAction): State {
  switch (action.type) {
    case 'NODES/ADD_NODE':
      return { ...state, nodes: state.nodes.concat(action.node) };
    case 'NODES/FETCH_START':
      return { ...state, isLoading: true, isLoaded: false };
    case 'NODES/FETCH_ERROR':
      return { ...state, isLoading: false, isLoaded: false, error: action.error };
    case 'NODES/FETCH_SUCCESS':
      return { ...state, isLoading: false, isLoaded: true, nodes: action.nodes };
    case 'NODES/START_DRAG':
      return { ...state, draggedNodeId: action.nodeId, nodeOffset: action.nodeOffset };

    case 'NODES/DRAG': {
      if (state.draggedNodeId === null) return state;
      const xDiff = state.nodeOffset.x - action.pageX;
      const yDiff = state.nodeOffset.y - action.pageY;
      return {
        ...state,
        nodeOffset: action.nodeOffset,
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
    }
    case 'NODES/STOP_DRAG':
      return {
        ...state,
        draggedNodeId: initialState.draggedNodeId,
        nodeOffset: initialState.nodeOffset
      };
    case 'NODES/UPDATE_POSITION':
      return {
        ...state,
        nodes: state.nodes.map(node =>
          node.id === action.nodeId ? { ...node, x: action.x, y: action.y } : node
        )
      };
    default:
      return state;
  }
}
