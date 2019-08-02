// @flow
import type { Edge, EdgeAction } from '../constants/ConnectGraphTypes';

export type State = {|
  error: ?string,
  isLoaded: boolean,
  isLoading: boolean,
  edges: Edge[]
|};
export const initialState = {
  error: null,
  isLoaded: false,
  isLoading: true,
  edges: []
};

export default function edgesReducer(state: State, action: EdgeAction): State {
  switch (action.type) {
    case 'EDGES/ADD':
      return { ...state, edges: state.edges.concat(action.edge) };
    case 'EDGES/FETCH_START':
      return { ...state, isLoading: true, isLoaded: false };
    case 'EDGES/FETCH_ERROR':
      return { ...state, isLoading: false, isLoaded: false, error: action.error };
    case 'EDGES/FETCH_SUCCESS':
      return { ...state, isLoading: false, isLoaded: true, edges: action.edges };
    case 'EDGES/DELETE':
      return { ...state, edges: state.edges.filter(edge => edge.id !== action.edge.id) };
    default:
      return state;
  }
}
