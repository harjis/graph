// @flow

import type { Edge } from '../constants/ConnectGraphTypes';
import { url } from './common';

export function fetchEdges(graph_id: number): Promise<Edge[]> {
  return fetch(`${url}/graphs/${graph_id}/edges`).then(response => response.json());
}
