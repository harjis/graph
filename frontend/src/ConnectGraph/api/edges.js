// @flow

import type { Edge } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function createEdge(
  graphId: number,
  from_node_id: number,
  to_node_id: number
): Promise<Edge> {
  return fetch(`${url}/graphs/${graphId}/edges`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from_node_id, to_node_id })
  }).then(response => response.json());
}
export function fetchEdges(graphId: number): Promise<Edge[]> {
  return fetch(`${url}/graphs/${graphId}/edges`, options).then(response => response.json());
}

export function destroyEdge(graphId: number, edgeId: number): Promise<true> {
  return fetch(`${url}/graphs/${graphId}/edges/${edgeId}`, {
    ...options,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
}
