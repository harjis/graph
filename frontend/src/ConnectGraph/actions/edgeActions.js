// @flow
import type { Edge, EdgeAction } from '../constants/ConnectGraphTypes';

export function addEdge(edge: Edge): EdgeAction {
  return { type: 'EDGES/ADD', edge };
}
export function fetchEdgesStart(): EdgeAction {
  return { type: 'EDGES/FETCH_START' };
}

export function fetchEdgesSucceed(edges: Edge[]): EdgeAction {
  return { type: 'EDGES/FETCH_SUCCESS', edges };
}

export function fetchEdgesError(error: string): EdgeAction {
  return { type: 'EDGES/FETCH_ERROR', error };
}

export function deleteEdge(edge: Edge): EdgeAction {
  return { type: 'EDGES/DELETE', edge };
}
