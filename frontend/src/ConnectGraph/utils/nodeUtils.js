// @flow
import shortid from 'shortid';

import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from '../../Graph/constants/GraphConstants';
import type { Node, NodeType } from '../constants/ConnectGraphTypes';

type Coordinates = {|
  x: number,
  y: number
|};

export function getNodeBottomMiddlePosition(node: Node): Coordinates {
  return {
    x: node.x + DEFAULT_NODE_WIDTH / 2,
    y: node.y + DEFAULT_NODE_HEIGHT
  };
}

export function getNodeTopMiddlePosition(node: Node): Coordinates {
  return {
    x: node.x + DEFAULT_NODE_WIDTH / 2,
    y: node.y
  };
}

export function getNode(nodes: Node[], nodeId: number | string): Node {
  let node;
  if (typeof nodeId === 'string') {
    node = nodes.find(node => node.client_id === nodeId);
  } else {
    node = nodes.find(node => node.id === nodeId);
  }

  if (!node) throw Error(`No node found with primary key: ${nodeId}`);
  return node;
}

export const createNode = (
  graph_id: number = 0,
  x: number = 100,
  y: number = 100,
  type: NodeType = 'InputNode'
): Node => ({
  content: {},
  created_at: '2019-08-01T06:26:14.964Z',
  client_id: shortid.generate(),
  errors: [],
  graph_id,
  id: null,
  name: 'New node',
  to_edge_ids: [],
  type,
  updated_at: '2019-08-01T06:26:14.964Z',
  x,
  y
});

export const createInputNode = (graph_id: number = 0, x: number = 100, y: number = 100) =>
  createNode(graph_id, x, y, 'InputNode');

export const createOutputNode = (graph_id: number = 0, x: number = 100, y: number = 100) =>
  createNode(graph_id, x, y, 'OutputNode');
