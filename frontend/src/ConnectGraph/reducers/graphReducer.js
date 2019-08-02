// @flow
import edgesReducer, { initialState as edgesInitialState } from './edgesReducer';
import nodesReducer, { initialState as nodesInitialState } from './nodesReducer';
import type { State as EdgesState } from './edgesReducer';
import type { State as NodesState } from './nodesReducer';
import type { EdgeAction, NodeAction } from '../constants/ConnectGraphTypes';

export type State = {|
  edges: EdgesState,
  nodes: NodesState
|};
export const initialState = {
  edges: edgesInitialState,
  nodes: nodesInitialState
};
export default function graphReducer(state: State, action: NodeAction | EdgeAction): State {
  switch (action.type) {
    case 'NODES/ADD':
    case 'NODES/FETCH_START':
    case 'NODES/FETCH_ERROR':
    case 'NODES/FETCH_SUCCESS':
    case 'NODES/START_DRAG':
    case 'NODES/DRAG':
    case 'NODES/STOP_DRAG':
      return { ...state, nodes: nodesReducer(state.nodes, action) };

    case 'EDGES/ADD':
    case 'EDGES/FETCH_START':
    case 'EDGES/FETCH_ERROR':
    case 'EDGES/FETCH_SUCCESS':
      return { ...state, edges: edgesReducer(state.edges, action) };

    default:
      return state;
  }
}
