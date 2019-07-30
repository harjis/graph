// @flow
import type { NodeAction, Node } from '../constants/ConnectGraphTypes';

export function addNode(node: Node): NodeAction {
  return { type: 'NODES/ADD_NODE', node };
}
export function fetchNodesStart(): NodeAction {
  return { type: 'NODES/FETCH_START' };
}

export function fetchNodesSucceed(nodes: Node[]): NodeAction {
  return { type: 'NODES/FETCH_SUCCESS', nodes };
}

export function fetchNodesError(error: string): NodeAction {
  return { type: 'NODES/FETCH_ERROR', error };
}

export function startNodeDrag(nodeId: number, nodeOffset: {| x: number, y: number |}): NodeAction {
  return { type: 'NODES/START_DRAG', nodeId, nodeOffset };
}

export function dragNode(
  nodeOffset: {| x: number, y: number |},
  pageX: number,
  pageY: number
): NodeAction {
  return { type: 'NODES/DRAG', nodeOffset, pageX, pageY };
}

export function stopNodeDrag(): NodeAction {
  return { type: 'NODES/STOP_DRAG' };
}
