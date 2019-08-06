// @flow
import type { Node } from '../constants/ConnectGraphTypes';
import { getRandomInt } from '../../utils/math_util';

const handlers = {
  onMouseDown: () => {},
  onMouseUp: () => {}
};
export const inputHandlers = { ...handlers, onClickFromConnector: () => {} };
export const outputHandlers = { ...handlers, onClickToConnector: () => {} };

export const createNode = (graph_id: number = 0, x: number = 100, y: number = 100): Node => ({
  content: {},
  created_at: '2019-08-01T06:26:14.964Z',
  errors: {},
  graph_id,
  id: getRandomInt(),
  name: 'New node',
  to_edge_ids: [],
  type: 'InputNode',
  update_at: '2019-08-01T06:26:14.964Z',
  x,
  y
});
