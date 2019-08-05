// @flow
import type { Node, NodeType } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function createNode(graph_id: number, type: NodeType): Promise<Node> {
  return fetch(`${url}/graphs/${graph_id}/nodes`, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: 'New Node!', type })
  }).then(response => response.json());
}

export function fetchNodes(graph_id: number): Promise<Node[]> {
  return fetch(`${url}/graphs/${graph_id}/nodes`, options).then(response => response.json());
}

export function updateNode(node: $Shape<Node>): Promise<boolean> {
  const { id, graph_id, ...rest } = node;
  return fetch(`${url}/graphs/${graph_id}/nodes/${id}`, {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rest)
  }).then(response => response.json());
}
