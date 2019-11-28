// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function fetchNodes(graphId: string): Promise<Node[]> {
  return fetch(`${url}/graphs/${graphId}/nodes`, options).then(response => response.json());
}
