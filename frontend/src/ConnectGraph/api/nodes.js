// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function fetchNodes(graph_id: number): Promise<Node[]> {
  return fetch(`${url}/graphs/${graph_id}/nodes`, options).then(response => response.json());
}
