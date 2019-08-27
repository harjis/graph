// @flow
import shortid from 'shortid';

import type { Edge } from '../constants/ConnectGraphTypes';

export const createEdge = (fromNodeId: number | string, toNodeId: number | string): Edge => ({
  clientId: shortid.generate(),
  fromNodeId,
  id: null,
  toNodeId
});
