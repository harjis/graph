// @flow
import uuid from 'uuid';

import type { Edge } from '../constants/ConnectGraphTypes';

export const createEdge = (fromNodeId: string, toNodeId: string): Edge => ({
  fromNodeId,
  id: uuid.v4(),
  toNodeId,
});
