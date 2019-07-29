// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import { url } from './common';

export function updateNode(node: $Shape<Node>): Promise<boolean> {
  const { id, graph_id, ...rest } = node;
  return fetch(`${url}/graphs/${graph_id}/nodes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest)
  }).then(response => response.json());
}
