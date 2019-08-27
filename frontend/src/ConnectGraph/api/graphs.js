// @flow
import type { Graph } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function fetchGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`, options).then(response => response.json());
}

export function undoGraph(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/undo`, options).then(response => response.json());
}

export function resetDb(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/reset`, options).then(response => response.json());
}
