// @flow
import type { Graph } from '../constants/ConnectGraphTypes';
import { url } from './common';

export function getGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`).then(resp => resp.json());
}
