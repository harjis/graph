// @flow
import type { Edge } from '../constants/ConnectGraphTypes';

export const createEdge = (from_node_id: number | string, to_node_id: number | string): Edge => ({
  created_at: '',
  from_node_id,
  id: null,
  name: null,
  to_node_id,
  updated_at: ''
});
