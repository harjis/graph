// @flow

import type { Edge } from '../constants/ConnectGraphTypes';
import { url } from './common';

export function fetchEdges(graphId: number): Promise<Edge[]> {
  return fetch(`${url}/graphs/${graphId}/edges`).then(response => response.json());
}

export function destroyEdge(graphId: number, edgeId: number): Promise<true> {
  return fetch(`${url}/graphs/${graphId}/edges/${edgeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
}
