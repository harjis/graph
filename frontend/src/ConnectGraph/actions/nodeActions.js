// @flow
import type { NodeAction, Node, Offset, Errors } from '../constants/ConnectGraphTypes';

export function addNode(node: Node): NodeAction {
  return { type: 'NODES/ADD', node };
}

export function invalidNode(errors: Errors): NodeAction {
  return { type: 'NODES/INVALID_NODE', errors };
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

export function startNodeDrag(nodeId: number, nodeOffset: Offset): NodeAction {
  return { type: 'NODES/START_DRAG', nodeId, nodeOffset };
}

export function dragNode(pageX: number, pageY: number): NodeAction {
  return { type: 'NODES/DRAG', pageX, pageY };
}

export function stopNodeDrag(): NodeAction {
  return { type: 'NODES/STOP_DRAG' };
}
