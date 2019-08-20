// @flow
import type { Node, Edge, Graph } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function fetchGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`, options).then(response => response.json());
}

export function saveAll(
  graphId: string,
  nodes: Node[],
  edges: Edge[]
): Promise<boolean> {
  return fetch(`${url}/graphs/${graphId}/save_all`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ graph: { id: graphId, name: 'Graph lol!' }, nodes, edges })
  }).then(response => response.json());
}

export function resetDb(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/reset`, options).then(response => response.json());
}

export function undoGraph(graphId: number) {
  return fetch(`${url}/graphs/${graphId}/undo`, options).then(response => response.json());
}
