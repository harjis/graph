// @flow
import nodesReducer, { initialState as nodesInitialState } from './nodesReducer';
import type { State as NodesState } from './nodesReducer';
import type { NodeAction } from '../constants/ConnectGraphTypes';

export type State = {|
  nodes: NodesState
|};
export const initialState = {
  nodes: nodesInitialState
};
export default function graphReducer(state: State, action: NodeAction): State {
  switch (action.type) {
    case 'NODES/ADD_NODE':
    case 'NODES/FETCH_START':
    case 'NODES/FETCH_ERROR':
    case 'NODES/FETCH_SUCCESS':
    case 'NODES/START_DRAG':
    case 'NODES/DRAG':
    case 'NODES/STOP_DRAG':
      return { ...state, nodes: nodesReducer(state.nodes, action) };

    default:
      return state;
  }
}
