// @flow
import edgesReducer, { initialState as edgesInitialState } from './edgesReducer';
import nodesReducer, { initialState as nodesInitialState } from './nodesReducer';
import type { State as EdgesState } from './edgesReducer';
import type { State as NodesState } from './nodesReducer';
import type { EdgeAction, NodeAction, SavingAction } from '../constants/ConnectGraphTypes';

export type State = {|
  isSaving: boolean,
  edges: EdgesState,
  nodes: NodesState
|};
export const initialState = {
  isSaving: false,
  edges: edgesInitialState,
  nodes: nodesInitialState
};
export default function graphReducer(state: State, action: SavingAction | NodeAction | EdgeAction): State {
  switch (action.type) {
    case 'SAVING':
      return {...state, isSaving: action.isSaving};
    case 'NODES/ADD':
    case 'NODES/INVALID_NODE':
    case 'NODES/FETCH_START':
    case 'NODES/FETCH_ERROR':
    case 'NODES/FETCH_SUCCESS':
    case 'NODES/START_DRAG':
    case 'NODES/DRAG':
    case 'NODES/STOP_DRAG':
      return { ...state, nodes: nodesReducer(state.nodes, action) };

    case 'EDGES/FETCH_START':
    case 'EDGES/FETCH_ERROR':
    case 'EDGES/FETCH_SUCCESS':
      return { ...state, edges: edgesReducer(state.edges, action) };

    case 'EDGES/ADD':
    case 'EDGES/DELETE':
      return {
        ...state,
        nodes: nodesReducer(state.nodes, action),
        edges: edgesReducer(state.edges, action)
      };

    default:
      return state;
  }
}
