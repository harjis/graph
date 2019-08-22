// @flow
import type { Edge } from '../constants/ConnectGraphTypes';

export const createEdge = (fromNodeId: number | string, toNodeId: number | string): Edge => ({
  fromNodeId,
  id: null,
  toNodeId
});
