// @flow

export type Graph = {|
  created_at: string,
  id: number,
  name: string,
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

export type Edge = {|
  created_at: string,
  from_node_id: number,
  id: number,
  name: ?string,
  to_node_id: number,
  updated_at: string
|};

export type Offset = {| x: number, y: number |};
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

type AddEdge = {| type: 'EDGES/ADD', edge: Edge |};
type FetchEdgesStart = { type: 'EDGES/FETCH_START' };
type FetchEdgesSuccess = { type: 'EDGES/FETCH_SUCCESS', edges: Edge[] };
type FetchEdgesError = { type: 'EDGES/FETCH_ERROR', error: string };
export type EdgeAction = AddEdge | FetchEdgesStart | FetchEdgesSuccess | FetchEdgesError;
