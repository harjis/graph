// @flow
import type { Edge } from '../constants/ConnectGraphTypes';
import { options, url } from './common';

export function fetchEdges(graphId: string): Promise<Edge[]> {
  return fetch(`${url}/graphs/${graphId}/edges`, options).then(response => response.json());
}
