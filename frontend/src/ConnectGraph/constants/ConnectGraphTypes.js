// @flow

export type Graph = {|
  id: number,
  name: string,
  created_at: string,
  updated_at: string
|};

export type Node = {|
  content: Object,
  created_at: string,
  graph_id: number,
  id: number,
  name: string,
  update_at: string,
  x: number,
  y: number
|};

type Offset = {| x: number, y: number |};
type AddNode = {| type: 'NODES/ADD_NODE', node: Node |};
type FetchNodesStart = { type: 'NODES/FETCH_START' };
type FetchNodesSuccess = { type: 'NODES/FETCH_SUCCESS', nodes: Node[] };
type FetchNodesError = { type: 'NODES/FETCH_ERROR', error: string };
type StartNodeDrag = {
  type: 'NODES/START_DRAG',
  nodeId: number,
  nodeOffset: Offset
};
type DragNode = { type: 'NODES/DRAG', pageX: number, pageY: number };
type StopNodeDrag = { type: 'NODES/STOP_DRAG' };
export type NodeAction =
  | AddNode
  | FetchNodesStart
  | FetchNodesSuccess
  | FetchNodesError
  | StartNodeDrag
  | DragNode
  | StopNodeDrag;
