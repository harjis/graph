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
    node = nodes.find(node => node.clientId === nodeId);
  } else {
    node = nodes.find(node => node.id === nodeId);
  }

  if (!node) throw Error(`No node found with primary key: ${nodeId}`);
  return node;
}

export const createNode = (
  graphId: number = 0,
  x: number = 100,
  y: number = 100,
  type: NodeType = 'InputNode'
): Node => ({
  content: {},
  clientId: shortid.generate(),
  errors: [],
  graphId,
  id: null,
  name: 'New node',
  toEdgeIds: [],
  type,
  x,
  y
});

export const createInputNode = (graphId: number = 0, x: number = 100, y: number = 100) =>
  createNode(graphId, x, y, 'InputNode');

export const createOutputNode = (graphId: number = 0, x: number = 100, y: number = 100) =>
  createNode(graphId, x, y, 'OutputNode');
