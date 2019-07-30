// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import type { NodeAction } from '../constants/ConnectGraphTypes';

type State = {|
  error: ?string,
  isLoaded: boolean,
  isLoading: boolean,
  nodes: Node[]
|};
export const initialState = { error: null, isLoaded: false, isLoading: true, nodes: [] };
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
    default:
      return state;
  }
}
