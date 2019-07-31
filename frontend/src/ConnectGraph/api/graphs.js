// @flow
import type { Graph } from '../constants/ConnectGraphTypes';
import { url } from './common';

export function fetchGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`).then(response => response.json());
}

export function undoGraph(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/undo`).then(response => response.json());
}
